var data = function () {



    return {
        list: [],
        detail: {},
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

            if (key == prop) {
                // 确保引发更改的控件不被更新
                $el.each(function (i, elem) {
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

        $el.each(function (i, elem) {
            elem.checked = initVal &&
                (initVal.indexOf(elem.value) >= 0);
        });


        // view -> data
        $el.change(function (e) {

            // what if ...
            data.set(prop, collectGroupValues(e.target), e.target);

        });

        function collectGroupValues(elem) {
            return $('[name=' + elem.name + ']:checked')
                .map(function (i, el) {
                    return el.value;
                })
                .get();

        }

        // data -> view
        data.on('datachange', function (e, key, value, src) {
            // value should be an array
            if (key == prop) {
                $el.each(function (i, elem) {
                    if (elem != src) {
                        elem.checked = value &&
                            (value.indexOf(elem.value) >= 0);
                    }
                });
            }

        });

    }

    return function (data, prop) {

        var $el = this;

        var type = $el.prop('type');

        switch (type) {
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

var dom = {
    $w: $(window),

    $mainPanel: $('#main-panel'),
    $sidePanel: $('#side-panel'),

    $listPage: $('#list-page'),
    $detailPage: $('#detail-page'),


};

var listPage = function () {


    return {
        appendTo: function ($parent) {
            dom.$listPage.appendTo($parent);
            return this;
        },
        hide: function () {
            dom.$listPage.hide();
            return this;
        },
        show: function () {
            dom.$listPage.show();
            return this;
        },
    };

}();

var detailPage = function () {


    return {
        appendTo: function ($parent) {
            dom.$detailPage.appendTo($parent);
            return this;
        },

        hide: function () {
            dom.$detailPage.hide();
            return this;
        },
        show: function () {
            dom.$detailPage.show();
            return this;
        },
    };

}();

var win = function () {

    var curPage;

    var stateWide = {

        init: function () {
            listPage.appendTo(dom.$sidePanel);

            detailPage.appendTo(dom.$mainPanel).hide();

            curPage = listPage;
        },

        resume: function () {
            listPage.appendTo(dom.$sidePanel);

            if (curPage == detailPage) {
                listPage.show();
            }
        },

        showPage: function (page) {

            if (page != curPage) {
                curPage = page;

                page == detailPage ? detailPage.show() : detailPage.hide();
            }

        },
    };

    var stateNarrow = {

        init: function () {

            listPage.appendTo(dom.$mainPanel);

            detailPage.appendTo(dom.$mainPanel).hide();

            curPage = listPage;

        },
        resume: function () {

            listPage.appendTo(dom.$mainPanel);

            if (curPage == detailPage) {
                listPage.hide();
            }

        },
        showPage: function (page) {

            if (page != curPage) {

                curPage.hide();

                curPage = page;

                page.show();

            }

        },
    };

    var state;

    function init() {
        state = winState();

        state.init();
    }

    function winState() {
        return 'none' != dom.$sidePanel.css('display') ?
            stateWide : stateNarrow;
    }

    dom.$w.resize(function () {

        var newState = winState();

        if (newState != state) {
            state = newState;
            state.resume();
        }

    });


    init();

    return {
        showPage: function (page) {
            state.showPage(page);
        },
    };

}();


var spa = function () {



}();



