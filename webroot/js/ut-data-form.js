

var vm = function () {
    
    var data = {
        name: 'name',
        uname: 'uname',
        age: 12
    };

    var observers = [];

    function notifyChange(key, value, ignore) {

        var value = data[key];

        $.each(observers, function (i, observer) {
            
            if (observer != ignore) {
                observer.update(key, value);
                console.log('+update ' + observer);
            }
            else {
                console.log('-ignore ' + ignore);
            }
            

        });
    }

    function addObserver(observer) {
        observers.push(observer);
    }

    function set(key, value, who) {

        console.log(key + ' => ' + value + ', [' + who + ']');

        data[key] = value;

        notifyChange(key, value, who);
    }

    function get(key) {
        return data[key];
    }

    return {
        addObserver: addObserver,
        set: set,
        get: get,
        data: data,
    };

}();


var frm = function () {
    
    var $frm = $('#frm'),
        inputs = initInputTable();

    var frm = {
        bind: bind,
        update: update,
        toString: function () {
            return 'frm';
        },
        inputs: inputs,
    };


    function bind(vm) {
        vm.addObserver(frm);
        frm.vm = vm;
    }

    function initInputTable() {

        var inputs = {};

        $frm.find('input').each(function(i, el) {
            inputs[el.id] = el;
        });

        $frm.on('input', function (e) {
            var el = e.target;

            frm.vm.set(el.id, el.value, frm);
        });

        return inputs;
    }

    function update(key, value) {
        var el = inputs[key];

        el && (el.value = value);
    }


    return frm;

}();

var div = function () {
    
    var $div = $('#val'), 
        fields = {
            name: $div.find('#a-name'),
            uname: $div.find('#a-uname'),
            age: $div.find('#a-age')
        };

    var view = {
        update: update,
        bind: bind,
        toString: function () {
            return 'view';
        }
    };

    function update(key, value) {
        fields[key].text(value);
    }

    function bind(vm) {
        vm.addObserver(view);
    }

    return view;

}();

frm.bind(vm);

div.bind(vm);
