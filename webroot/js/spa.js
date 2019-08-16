
(function () {
	
	var list = (function () {
		
        var $list = $('#list').detach();
        
        function appendTo($parent) {
        	$list.appendTo($parent);
        }
        function hide() {
        	$list.detach();
        }

        return {
            
            appendTo: appendTo,
            hide: hide,
        };
		
	}());
    
    var user = (function () {
    	
    	var $user = $('#user').detach();
        
        function appendTo($parent) {
        	$user.appendTo($parent);
        }
        
        function hide() {
        	$user.detach();
        }
        
        return {
            
            appendTo: appendTo,
            
            hide: hide,

            
        };
    	
    }());
    
    var spa = (function () {
    	
    	var $spa = $('#spa'),
            $w = $(window);
        
        var pages = {
            list: list,
            user: user
        };
        
        var curPage;
        
        $w.on('hashchange', function (e) {
        	
            var page = pages[location.hash.slice(1)];
            
            curPage && curPage.hide();
            
            curPage = page;
            
            page.appendTo($spa);
            
        });
        
    	
    }());
	
}());
