(function () {
    'use strict';

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

        showErrorMsg: function (msg) {
            $frmMsg.text(msg).addClass('error');
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

    var nonce = {
        init: function () {
            var deferred =
                this.deferred = $.Deferred();

            $.getJSON('getNonce.php', function (data) {
                deferred.resolve(data);
            });

        }
    };

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

                frmLogin.showErrors({ uname: data.data });

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

}());
