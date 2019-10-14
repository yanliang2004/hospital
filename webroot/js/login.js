
(function () {
    'use strict';

    // nonce: avoid replay attack: hash = md5(md5(uname:pw):nonce);
    var nonce = {
        reset: function () {
            return $.getJSON('getNonce.php');
        }
    };

    // 
    var frmLogin = function ($, md5) {

        var dom = {
            $frm: $('#frm-login'),
            $uname: $('#uname'),
            $pw: $('#pw'),
            $btnLogin: $('#btn-login')
        };

        var validator = dom.$frm.validate({
            success: 'valid',
            submitHandler: submit
        });

        var def;

        function submit() {
            def && def.resolve({
                uname: dom.$uname.val(),
                pw: dom.$pw.val()
            });

        }


        return {
            reset: function () {
                def = $.Deferred();

                return def;
            },

            showErrors: function (errors) {
                validator.showErrors(errors);
            },

            getUname: function () {
                return $uname.val();
            }
        };

    }(jQuery, md5);


    !function () {

        $.when(nonce.reset(), frmLogin.reset())
            .done(function (arg1, arg2) {
                login(arg1[0], arg2);
            });

    }();

    function login(nonce, user) {
        var loginHash = md5(md5(user.uname + ':' + user.pw) + nonce);

        console.log(nonce, user);

        $.post(
            'login.php',
            { uname: user.uname, loginHash: loginHash },
            onLoginResult,
            'json'
        );

    }

    function loginSuccess(uname) {
        store.set('uname', uname);

        location = 'user-admin.html';
    }


    function onLoginResult(data) {

        switch (data.code) {

            case 0: // login success:

                loginSuccess(frmLogin.getUname());

                break;

            case 1: // validation failed

                frmLogin.showErrors(data.data);

                break;

            case 2: // no such user:

                frmLogin.showErrors({
                    uname: data.data
                });

                break;

            case 3: // wrong password:

                frmLogin.showErrors({
                    pw: data.data
                });

                break;

            case 5: // db error:

                frmLogin.showErrors({
                    frm: data.data
                });

                break;

        }

    }

}());
