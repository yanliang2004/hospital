
// login, form related code

var $uname = $('#uname'),
    $pw = $('#pw'),
    $btnLogin = $('#btn-login'),
    $btnResetPass = $('#btn-reset-pw'),
    $lblUname = $('label[for="uname"]'),
    $lblPw = $('label[for="pw"]');


function onLogin(fn) {



}

function reset() {
    $btnLogin.prop('disabled', false);
    $btnResetPass.prop('disabled', false);
}





export default {
    onLogin: onLogin
};
