
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


var data = function () {
    
    var list = genTestList();

    var detailCache = {},
        curID;


    function genTestList() {
        var data = Mock.mock({
            'list|20': [{
                'id|+1': 1,
                uname: '@first',
                name: '@cname',
                dept: 2
            }]
        });

        return data.list;
    }



    return {
        show: function () {
            return list;
        },

        getList: function () {
            return list;
        },

        // shallow copy
        clone: function (detail) {
            return $.extend({}, detail);
        },

        // shallow comparison
        isDifferent: function (obj1, obj2) {
            for (var k in obj1) {
                if (obj1[k] != obj2[k]) {
                    return true;
                }
            }
            return false;
        }


    };

}();

var dom = {
    $w: $(window),
    $list: $('#list'),
    $liTmpl: $('#li-tmpl'),
    $frmDetail: $('#frm-detail'),
    $uname: $('#uname'),
    $name: $('#name'),
    $dept: $('#dept')
};

// object
var listPage = function () {
    
    // class 
    var ListItem = function () {
        
        function ListItem(data) {
            this.$el = dom.$liTmpl.clone().removeAttr('id');

            this.$a = this.$el.children();

            this.$a.attr('href', '#id=' + data.id).text(data.name);
        }

        $.extend(ListItem.prototype, {
            appendTo: function ($parent) {
                this.$el.appendTo($parent);
            },
        });


        return ListItem;

    }();

    return {
        showList: function (listData) {
            $.each(listData, function (i, item) {
                new ListItem(item).appendTo(dom.$list);
            });
        },
    };

}();

listPage.showList(data.getList());

var frmDetail = function () {
    
    var viewData = function () {
        
        var data = {};

        return {
            get: function (prop) {
                return data[prop];
            },

            set: function (prop, value, src) {
                
            },


        };

    }();



    return {

        showDetail: function (detail) {
            for (var k in detail) {
                viewData.set(k, detail[k]);
            }
        }

    };

}();






