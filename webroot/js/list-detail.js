var data = function () {

    

    return {
        list: ,
        detail: ,
    }

} ();

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

} ();

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

} ();

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

} ();


var spa = function () {



} ();



