import loginObj from './login-obj';
import form from './login-form';

init();

function init() {

    $.getJSON('getNonce.php', {}, function (data) {
        loginObj.setNonce(data.nonce);
    });

    loginObj.init(ajaxLogin);

    form.onLogin(loginObj.setUserPass);
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

