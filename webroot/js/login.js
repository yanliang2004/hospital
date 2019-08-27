(function () {
    'use strict';

    var nonce;

    var uname, pw;

    var fn;

    function init(loginFn) {
        fn = loginFn;
    }

    function setNonce(value) {

        nonce = value;

        console.log('nonce: ' + nonce);

        if (isUserPassReady()) {
            login();
        }

    }

    function setUserPass(vUser, vPass) {
        uname = vUser;
        pw = vPass;

        if (isNonceReady()) {
            login();
        }
    }

    function isNonceReady() {
        return nonce;
    }

    function isUserPassReady() {
        return uname && pw;
    }

    // fn(uname, loginHash)
    function login() {

        var pwh = md5(uname + ':' + pw);

        var loginHash = md5(pwh + ':' + nonce);

        fn(uname, loginHash);

        console.log('uname: ', uname, ', loginHash: ', loginHash);

    }

    var loginObj = {
        init: init,
        setNonce: setNonce,
        setUserPass: setUserPass
    };

    // login, form related code

    var $frmLogin = $('#frm-login'),
        $uname = $('#uname'),
        $pw = $('#pw'),
        $btnLogin = $('#btn-login'),
        $btnResetPass = $('#btn-reset-pw'),
        $lblUname = $('label[for="uname"]'),
        $lblPw = $('label[for="pw"]');

    var validator = $frmLogin.validate({
        success: 'valid',
        submitHandler:  function (form) {
            
        }
    });

    init$1();

    function init$1() {

        $.getJSON('getNonce.php', {}, function (data) {
            loginObj.setNonce(data.nonce);
        });

        loginObj.init(ajaxLogin);
    }

    function ajaxLogin(uname, loginHash) {

        $.post(
            'login.php',
            { uname: uname, loginHash: loginHash },
            function (data) {

                console.log(data);

                // if login success

            }
        );

    }

}());
