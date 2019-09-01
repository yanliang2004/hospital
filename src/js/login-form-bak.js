
// login, form related code

var $frmLogin = $('#frm-login'),
    $uname = $('#uname'),
    $pw = $('#pw'),
    $btnLogin = $('#btn-login'),
    $btnResetPass = $('#btn-reset-pw'),
    $lblUname = $('label[for="uname"]'),
    $lblPw = $('label[for="pw"]');

// 可以提交时，调用此函数：
var fnLogin;

var validator = $frmLogin.validate({
    success: 'valid',
    submitHandler:  function (form) {

        console.log('submitting login');

        fnLogin(form.uname.value, form.pw.value);
    }
});

function onLogin(fn) {

    fnLogin = fn;

}

function reset() {
    $btnLogin.prop('disabled', false);
    $btnResetPass.prop('disabled', false);
}


export default {
    onLogin: onLogin
};
