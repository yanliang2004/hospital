
var data = function() {

    var data = {
            gender: 0
        },
        $msg = $({});

    return {
        get: function (key) {
            return data[key];
        },

        set: function (key, value, src) {
            if (data[key] != value) {
                data[key] = value;

                $msg.trigger('datachange', [key, value, src]);
            }
        },

        onchange: function (fn) {
            $msg.on('datachange', fn);
        },

        on: function (e, fn) {
            $msg.on(e, fn);
        },

        show: function () {
            return data;
        }
    }
}();


$.fn.databind = function () {
    

    function bindText($el, data, prop) {

        // init view:
        $el.val(data.get(prop));

        // view -> data
        $el.change(function (e) {
            data.set(prop, e.target.value, e.target);
        });

        // data -> view
        data.on('datachange', function (e, key, value, src) {
            
            if (key == prop)
            {
                // 确保引发更改的控件不被更新
                $el.each(function(i, elem) {
                    if (elem != src) {
                        elem.value = value;
                    }
                });

            }

        });

    }

    function bindRadio($el, data, prop) {

        // init view: 
        var initVal = data.get(prop);

        $el.prop('checked', function (i, oldPropValue) {
            return this.value == initVal;
        });

        // view -> data
        $el.change(function (e) {
            data.set(prop, e.target.value, e.target);
        });

        // data -> view
        data.on('datachange', function (e, key, value, src) {
            if (prop == key) {
                $el.each(function (i, elem) {

                    // same name -> same group
                    if (!src || elem.name != src.name) {
                        elem.checked = elem.value == value;
                    }

                });
            }
        });

    }

    function bindSelect($el, data, prop) {
        
        // init view: single or multiple
        $el.val(data.get(prop));

        // view -> data
        $el.change(function (e) {
            data.set(prop, $(e.target).val(), e.target);
        });

        // data -> view
        data.on('datachange', function (e, key, value, src) {
            if (key == prop) {
                $el.each(function (i, elem) {
                    if (elem != src) {
                        // simplify select value set (single & multi)
                        $(elem).val(value);
                    }
                });
            }
        });

    }

    function bindCheckbox($el, data, prop) {
        
        // init view:

        var initVal = data.get(prop);

        $el.prop('checked', function (i, oldPropValue) {
            this.checked =
                initVal &&
                    (initVal.indexOf(this.value) >= 0);
        });


        // view -> data
        $el.change(function (e) {

            // what if ...
            data.set(prop, collectGroupValues(e.target));
        });

        function collectGroupValues(elem) {
            return $('[name=' + elem.name + ']:checked')
                    .map(function (i, el) {
                        return el.id;
                    })
                    .get();

        }

        // data -> view
        data.on('datachange', function (e, key, value, src) {
            // value should be an array
            if (key == prop) {
                $el.prop('checked', function (i, oldPropValue) {
                    return value && (value.indexOf(this.value) >= 0);
                });
            }

        });

    }

    return function (data, prop) {

        var $el = this;

        var type = $el.prop('type');

        switch (type)
        {
            case 'radio':
                bindRadio($el, data, prop);
            break;

            case 'checkbox':
                bindCheckbox($el, data, prop);
            break;

            default:
                bindText($el, data, prop);
            break;
        }

        // 'select-one' 'select-many'
        if (/select/.test(type)) {
            bindSelect($el, data, prop);
        }

    };


}();

var frm = function () {
    
    var $uname = $('#uname'),
        $gender = $('#male, #female'),
        $fruit = $('[name=fruit]'),
        $fruit2 = $('[name=fruit2]'),
        $dept = $('#dept');

    $uname.databind(data, 'uname');

    $gender.databind(data, 'gender');

    $fruit.databind(data, 'fruit');
    
    $fruit2.databind(data, 'fruit');

    $dept.databind(data, 'dept');

}();



