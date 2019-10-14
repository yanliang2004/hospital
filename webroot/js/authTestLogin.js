var $uname = $('#uname'),
    $btnLogin = $('#btn-login'),
    $msgUname = $('#field-msg-uname');

$btnLogin.click(function (e) {
    e.preventDefault();

    var uname = $uname.val();

    $.post('authTestLogin.php', { uname: uname }, function (data) {

        switch (data.code) {
            case 0:

                clientAuth.login(uname);

                location = 'authTest.html';

                break;

            default:

                $msgUname.text(data.result);

                break;
        }

    }, 'json');

});










