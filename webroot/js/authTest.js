var $uname = $('#uname'),
    $aLogout = $('#a-logout');

clientAuth.protect();

$aLogout.click(function (e) {
    e.preventDefault();

    clientAuth.logout();

    $.post('authTestLogout.php');

    location = 'authTestLogin.html';
});