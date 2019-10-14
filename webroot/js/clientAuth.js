
var clientAuth = function ($, store) {

    var KEY_UNAME = 'uname',
        urlLogin = 'authTestLogin.html';


    function authOrExit() {
        if (!store.get(KEY_UNAME)) {
            location = urlLogin;
        }
    }

    return {

        // protect current page:
        protect: function () {

            setInterval(function () {

                authOrExit();

            }, 1000);

        },

        // save login state on client side:
        login: function (uname) {
            store.set(KEY_UNAME, uname);
        },

        // exit login state on client side:
        logout: function () {
            store.remove(KEY_UNAME);
        },

    };

}($, store);


