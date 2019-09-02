var frmLogin = function () {

    var $frm = $('#frm-login'),
        $uname = $frm.find('#uname'),
        $pw = $frm.find('#pw'),
        $btnSave = $frm.find('#btn-save'),
        $frmMsg = $frm.find('#frm-msg');

    // 用于显示服务器返回的错误消息
    var validator = $frm.validate({
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
        },

        showMsg: function (msg) {
            $frmMsg.text(msg);

            console.log(msg);
        },

        showFieldErrors: function (fieldErrors) {
            validator.showErrors(fieldErrors);
        },

        disableForm: disableForm,

        enableForm: enableForm

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
                console.log('nonce: ', nonce);

                deferred.resolve(nonce);
            });
        },

        reset: function () {
            this.init();
        },

    };


}();


!function () {


    init();

    function init() {

        frmLogin.init();

        nonce.init();

        $.when(frmLogin.deferred, nonce.deferred)
         .then(tryLogin);
        
    }

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
            onLoginResult,
            'json'
        );

    }



    function onLoginResult(data) {

        // console.log(data);

        switch (data.code) {
            case 0:

                console.log('login success');

                document.title = '登陆成功';

                break;

            case 1:



                break;

            case 2:

                console.log('用户不存在');

                frmLogin.showFieldErrors(data.result);

                break;

            case 3:

                console.log('密码不对');

                frmLogin.showFieldErrors(data.result);

                break;

            case 5: 

                frmLogin.showMsg('登陆失败： ' + data.result);

                break;
        }

        init();

    }

}()

