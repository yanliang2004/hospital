import frmLogin from './login-form.js'
import nonce from './login-nonce.js'

function init() {

    frmLogin.init();

    nonce.init();

    $.when(frmLogin.deferred, nonce.deferred)
        .done(tryLogin);

}

function tryLogin(userData, nonce) {

    var loginHash = calcLoginHash(userData, nonce);

    $.post(
        'login.php',
        { uname: userData.uname, loginHash: loginHash },
        onLoginResult,
        'json'
    );
}

function calcLoginHash(userData, nonce) {

    var pwh = md5(userData.uname + ':' + userData.pw);

    return md5(pwh + ':' + nonce);

}


function onLoginResult(data) {

    console.log(data);

    switch (data.code) {
        case 0:

            location = 'user-list.html';

            break;

        case 1:

            frmLogin.showErrors(data.data);

            break;

        case 2:

            frmLogin.showErrors({ uname: data.data })

            break;

        case 3:

            frmLogin.showErrors({ pw: data.data });

            break;

        case 5:

            frmLogin.showErrors({ uname: data.data });

            break;
    }

    init();
}


init();