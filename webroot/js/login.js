(function () {
	
    //Mock.mock('getNonce.php', {nonce: 19000});
    
	//Mock.mock('login.php', {result: 0});
	
}());


(function () {
	
	var login = (function () {
		
		var nonce;
        
        var uname, pw;
        
        // fnLogin(uname, loginHash);
        var fnLogin;
        
        function init(fn) {
        	fnLogin = fn;
        }
        
        function setNonce(value) {
        	nonce = value;
            
            checkSubmit();
        }
        
        function setLogin(u, p) {
        	uname = u;
            pw = p;
            
            checkSubmit();
        }
        
        function checkSubmit() {
        	
            var loginHash;
            
            if (nonce && uname && pw) {
                
                loginHash = md5(md5(uname + ':' + pw) + ':' + nonce);
                
                fnLogin(uname, loginHash);
            }
        }
        
        return {
            init: init,
            setNonce: setNonce,
            setLogin: setLogin
        };
		
	}());
    
    
    var frm = (function () {
    	
    	var $frm = $('#frm-login'),
            $uname = $('#uname'),
            $pw = $('#pw'),
            $btnLogin = $('#btn-login');
        
        var validator = $frm.validate({
            submitHandler: function () {
            	login.setLogin($uname.val(), $pw.val());
            }
        });
        
        function noSuchUser() {
        	validator.showErrors({
                'uname': '用户名不存在'
            });
        }
        
        function wrongPw() {
        	validator.showErrors({
                pw: '密码错误'
            });
        }
        
        return {
            noSuchUser: noSuchUser,
            wrongPw: wrongPw,
            validator: validator
        };
    	
    }());
    
    
    var page = (function () {
    	
        function getNonce() {
            
            var req = $.getJSON('getNonce.php');
            
            req.done(function (data) {
                login.setNonce(data.nonce);
                
            });
            
            req.fail(function (jqXHR, textStatus, err) {
                console.log('getNonce(): ', textStatus, err);
            });
            
        }
        
        function tryLogin(uname, loginHash) {
            
            
            var reqLogin = $.post(
                'login.php',
                {
                    uname: uname,
                    loginHash: loginHash
                }
            );
            
            reqLogin.fail(function (jqXHR, textStatus, err) {
                console.log('Error in tryLogin(): ', textStatus, err);
            });
            
            
            // data.result: 0: success, 1: no such user, 2: wrong pw
            reqLogin.done(function (data) {
                
                
                data = $.parseJSON(data);
                
                switch (data.result) {
                    
                    case 0: 
                        
                        allowAccess();
                        
                    break;
                    
                    case 1:
                    
                        frm.noSuchUser();
                    
                    break;
                    
                    case 2: 
                    
                        frm.wrongPw();
                    
                    break;
                    
                }
                
            });
            
        }
        
        function allowAccess() {
            
            window.location = 'main.html';
            
        }
        
        function init() {
            
            login.init(tryLogin);
            
            getNonce();
            
        }
        
        return {
            init: init
        };
        
    }());
    
    
    page.init();
	
}());












