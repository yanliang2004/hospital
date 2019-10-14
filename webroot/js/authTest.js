!function () {
    
    var KEY_UNAME = 'uname',
        URL_LOGIN = 'login.html';

    if (!store.get(KEY_UNAME)) {
        alert('请先登录');
        location = URL_LOGIN;
    }

}();
