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

            onLoginResult(data);

        }
    );

}

function onLoginResult(data) {

    console.log(data);

    switch (data.code) {

        case 0: // success

            alert('success');

            break;

        case 1: // no such user

            alert('no such user');

            break;

        case 2: // pw wrong

            alert('wrong pw');

            break;

    }

}