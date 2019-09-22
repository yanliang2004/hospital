

var data = function () {

    var data = {
        uname: 'yl',
        name: 'yanliang',
        gender: 'female',
        dept: 2
    },
        $msg = $({});

    return {

        getData: function () {
            return data;
        },

        // notify: bool, if true, notify change
        set: function (key, value, src) {
            if (data[key] != value) {

                data[key] = value;

                $msg.trigger('datachange', [key, value, src]);

            }
        },

        get: function (key) {
            return data[key];
        },

        onchange: function (fn) {
            $msg.on('datachange', fn);
        },

    };

}();

var Gender = function () {

    function Gender($box) {
        this.$inputs = $('#male, #female');
    }

    $.extend(Gender.prototype, {

        setVal: function (value) {
            this.$inputs
                .filter('[value=' + value + ']')
                .prop('checked', true);
        },

        getVal: function () {
            return this.$inputs
                .filter(':checked')
                .val();
        },

        val: function (value) {
            if (undefined !== value) {
                this.setVal(value);
            }
            else {
                return this.getVal();
            }
        },



    });



    return Gender;

}();

var viewForm = function () {

    var $frm = $('#frm-view'),
        inputs = {
            uname: $('#uname'),
            name: $('#name'),
            gender: new Gender($('#gender')),
            dept: $('#dept'),
        };

    $frm.change(function (e) {
        var el = e.target;

        $frm.trigger(
            'viewchange',
            [el.name || el.id, el.value]
        );
    });

    return {

        showData: function (data) {
            $.each(inputs, function (key, $el) {
                $el.val(data[key]);
            });
        },

        showProp: function (key, value) {
            inputs[key].val(value);
            console.log('frm showProp()');
        },

        onchange: function (fn) {
            $frm.on('viewchange', fn);
        },


    };


}();

var viewData = function () {

    var cells = {
        uname: $('#data-uname'),
        name: $('#data-name'),
        gender: $('#data-gender'),
        dept: $('#data-dept')
    };


    return {
        showData: function (data) {
            $.each(cells, function (key, $el) {
                $el.text(data[key]);
            });
        },

        showProp: function (key, value) {
            cells[key] && cells[key].text(value);

            console.log('viewData showProp()');
        },
    };

}();


var viewDataCtrl = function (view, data) {

    data.onchange(function (e, key, value, src) {
        src != view &&
            view.showProp(key, value);
    });

    view.showData(data.getData());

}(viewData, data);


var viewFormCtrl = function (view, data) {

    data.onchange(function (e, key, value, src) {
        src != view &&
            view.showProp(key, value);
    });

    view.onchange(function (e, key, value) {
        data.set(key, value, view);
    });

    view.showData(data.getData());

}(viewForm, data);

