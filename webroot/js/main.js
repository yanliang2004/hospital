(function () {
	
	// Mock.mock('mainData.php', {login: 1, nAlerts: 7});
	
}());

(function () {
	
	var userMenu = (function () {
		
		var $btnUser = $('#btn-user'),
            $userMenu = $('#user-menu'),
            $aUserInfo = $('#a-user-info'),
            $aChangePw = $('#a-change-pw'),
            $aLogout = $('#a-logout');
		
        function enableDropDown() {
            
        	$btnUser.click(function (e) {
        		
                e.preventDefault();
                
                $userMenu.slideToggle(200);
                
        	});
        }
        
        function enableLogout() {
        	$aLogout.click(function (e) {
        		e.preventDefault();
                
                $.post('logout.php');
                
                window.location = 'login.html';
        	});
        }
        
        function init() {
            
            enableDropDown();
            
        	enableLogout();
            
        }
        
        
        init();
        
        return {
            
        };
        
	}());
    
    var userInfo = (function () {
    	
    	var $user = $('#user'),
            $dept = $('#dept');
        
        function setInfo(name, dept) {
        	$user.text(name);
            $dept.text(dept);
        }
        
        return {
            setInfo: setInfo
        };
    	
    }());
    
    var cardAlert = (function () {
    	
    	var $card = $('#card-alert'),
            $cardTitle = $card.find('.card-title');
        
        function setAlert(n) {
        	$cardTitle.text('危急报告 [ ' + n + ' ]');
        }
        
        return {
            setAlert: setAlert
        };
    	
    }());
    
    
    var page = (function () {
    	
        function getData() {
            
        	var reqMain = $.getJSON('mainData.php');
            
            reqMain.done(function (data) {
            	
                if (!data.login) {
                    denyAccess();
                    return;
                }
                
                cardAlert.setAlert(data.nAlerts);
                
            });
            
        }
        
        function denyAccess() {
        	window.location = 'login.html';
        }
        
        function init() {
        	
            getData();
            
        }
        
    	init();
        
        return {
            
        };
    	
    }());
    
	
}());

















