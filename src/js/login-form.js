var $frm = $('#frm-login'),
    $frmMsg = $('#form-msg'),
    $uname = $('#uname'),
    $pw = $('#pw'),
    $btnSave = $('#btn-login');

var frmLogin = {

    init: function () {
        this.deferred = $.Deferred();

        this.enable();

        $frmMsg.removeClass('error');
    },

    enable: function () {

        $uname.prop('disabled', false);
        $pw.prop('disabled', false);
        $btnSave.prop('disabled', false);
    },

    disable: function () {
        $uname.prop('disabled', true);
        $pw.prop('disabled', true);
        $btnSave.prop('disabled', true);
    },

    showErrors: function (errors) {
        validator.showErrors(errors);
    },


};

var validator = $frm.validate({
    success: 'valid',
    submitHandler: function () {

        frmLogin.disable();

        frmLogin.deferred.resolve({
            uname: $uname.val(),
            pw: $pw.val()
        });

    }
});


export default frmLogin;

