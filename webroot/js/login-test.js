var frmLogin = function () {

    var $frm = $('#frm-login'),
        $uname = $frm.find('#uname'),
        $pw = $frm.find('#pw'),
        $btnSave = $frm.find('#btn-save');

    $frm.validate({
        success: 'valid',
        submitHandler: function () {
            disableForm();

            frmLogin.deferred.resolve(getFormData());

            console.log('submit');
        }
    });

    var frmLogin = {

        init: function () {
            this.deferred = $.Deferred();

            enableForm();
        },

        reset: function () {
            this.init();
        }

    };

    function disableForm() {
        $uname.prop('disabled', true);
        $pw.prop('disabled', true);
        $btnSave.prop('disabled', true);
    }

    function enableForm() {
        $uname.prop('disabled', false);
        $pw.prop('disabled', false);
        $btnSave.prop('disabled', false);
    }

    function getFormData() {
        return {
            uname: $uname.val(),
            pw: $pw.val()
        };
    }


    return frmLogin;

}();



var nonce = function () {


    return {
        init: function () {
            var deferred = this.deferred = $.Deferred();

            $.getJSON('getNonce.php', function (nonce) {
                deferred.resolve(nonce);
            });
        },

        reset: function () {
            this.init();
        },

    };


}();


!function () {

    frmLogin.init();

    nonce.init();

    $.when(frmLogin.deferred, nonce.deferred)
        .then(tryLogin, reset);

    function tryLogin(userData, nonce) {

        console.log(userData);
        console.log(nonce);

        var pwh = md5(userData.uname + ':' + userData.pw);

        var loginHash = md5(pwh + ':' + nonce);

        $.post(
            'loginTest.php',
            {
                uname: userData.uname,
                loginHash: loginHash
            },
            onLoginResult
        );

    }

    function reset() {
        console.log('reset');
    }

    function onLoginResult(data) {
        switch (data.code) {
            case 0:

                console.log('login success');

                break;

            case 1:



                break;

            case 2:

                console.log('wrong pw');

                break;
        }
    }

}()

