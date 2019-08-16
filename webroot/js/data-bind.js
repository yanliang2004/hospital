var ViewModel = function () {

        function ViewModel(data) {

            this.data = data;

            this.observers = [];

        }

        $.extend(ViewModel.prototype, {

            addView: function (view) {
                this.observers.push(view);
            },

            // pass source of change, to prevent infinite loop
            set: function (key, value, src) {

                // no change:
                if (this.data[key] == value) {
                    return;
                }

                this.data[key] = value;

                this._notifyChange(key, value, src);

            },

            _notifyChange: function (key, value, ignore) {

                $.each(this.observers, function(i, observer) {
                    if (ignore != observer) {
                        observer.update(key, value);
                    }
                });

            },

            toString: function () {
                return 'ViewModel instance';
            },

        });

        // 'static' methods:
        $.extend(ViewModel, {
            create: function (data) {
                return new ViewModel(data);
            },
        });


    return ViewModel;

} ();


var IView = {
    
    update: function (key, value) {

    },

    bind: function (viewmodel) {

    },


};

var viewFrm = function () {
    
    var $frm = $('#frm');

    var view = {
        update: update,
        bind: bind,
        toString: toString
    };

    var vm;

    function update(key, value) {
        var input = $frm[0][key];

        input && (input.value = value);
    }

    function bind(viewmodel) {
        vm = viewmodel;
        vm.addView(view);

        $frm.children('input').each(function (i, el) {
            el.value = vm.data[el.name];
        });

        $frm.on('input', function (e) {
            
            var input = e.target;

            vm.set(input.name, input.value, view);

        });
    }



    function toString() {
        return 'viewFrm';
    }

    return view;

}();

var viewTest = {

    update: function (key, value) {

        console.log('viewTest update [' + key + '] => ' + value);

    },

    bind: function (viewmodel) {

        console.log('viewTest bind() to ' + viewmodel);
        console.log(viewmodel.data);

        this.vm = viewmodel;

        viewmodel.addView(this);

    },

    change: function (key, value) {

        console.log('viewTest, emu change [' + key + '] => ' + value);

        this.vm.set(key, value, this);
    },

    toString: function () {
        return 'viewTest';
    },

};

var vm = ViewModel.create({
    name: 'jack',
    uname: 'jack001',
    age: 14
});

viewTest.bind(vm);

viewFrm.bind(vm);
