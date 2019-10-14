var auth = function () {

    var urlLogin = 'authTestLogin.html',
        keyUname = 'uname',
        keyUrl = 'targetUrl';


    function onLoginResult(data) {
        switch (data.code) {
            case 0:

                store.set(keyUname, data.uname);

                location = store.get(keyUrl);

                break;

            case 7:

                return '登录失败';

                break;
        }
    }

    return {
        login: function (uname) {

            store.set(keyUname, uname);

            location = store.get(keyUrl);

        },

        logout: function () {
            store.remove(keyUname);

            location = urlLogin;
        },

        auth: function () {
            if (store.get(keyUname)) {
                return true;
            }
            else {
                alert('未登录');
                location = urlLogin;
            }
        },

        setTarget: function (url) {
            store.set(keyUrl, url);
        },

        tryLogin: function (opt) {

            store.set(keyUrl, opt.targetUrl);

            $.post('authTestLogin.php', { uname: opt.uname }, onLoginResult, 'json');


        },



    };

}();