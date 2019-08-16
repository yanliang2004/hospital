
(function () {
	
    
    var page = (function () {
    	
    	function appendTo($parent) {
    		this.$el.appendTo($parent);
    	}
        
        function detach() {
        	this.$el.detach();
        }
    	
        return {
            appendTo: appendTo,
            detach: detach
        };
        
    }());
	
    var pageList = Object.create(page, {
        $el: {value: $('#list').detach()}
    });
    
    var pageDetail = Object.create(page, {
        $el: {value: $('#detail').detach()}
    });
    
    
    var winNarrow = (function () {
    	
        var $main = $('#main');
        
        var curPage;
        
    	function showPage(page) {
    		if (curPage != page) {
                
                curPage && curPage.detach();
                
                page.appendTo($main);
                
                curPage = page;
            }
    	}
        
        return {
            showPage: showPage
        };
    	
    }());
    
    var winWide = (function () {
    	
        var $main = $('#main'),
            $detailPanel = $('#detail-panel');
        
    	function showPage(page) {
            
            if (pageList.$el[0].parentNode != $main) {
                pageList.appendTo($main);
            }
            
            page == pageDetail ?
                pageDetail.appendTo($detailPanel) :
                pageDetail.detach();
            
    	}
        
        
        return {
            showPage: showPage
        };
    	
    }());
    
    var spa = (function () {
    	
    	var $w = $(window);
    	
        var win;
        
        var pages;
        
        function init(objPages) {
            
        	pages = objPages;
            
            win = determineWin();
            
            $w.on('hashchange', showUri);
            
            showUri();
        }
        
        function determineWin() {
        	var $detailPanel = $('#detail-panel');
            
            if ('none' == $detailPanel.css('display')) {
                return winNarrow;
            }
            else {
                return winWide;
            }
        }
        
        function showUri() {
            var name = location.hash.slice(1);
            
            var page = getPage(name);
            
        	win.showPage(page);
            
            // console.log(page);
            
        }
        
        function getPage(name) {
        	return pages[name] ||
                   pages.list;
        }
        
        
        return {
            init: init
        };
        
    }());
    
    
    spa.init({
        list: pageList,
        detail: pageDetail
    });
    
    
}());

