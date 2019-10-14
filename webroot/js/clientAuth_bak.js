var urlMap = function ($, store) {

    var KEY_URLS = 'urlsProtect',
        map;

    function buildMap(urls) {
        var map = {};

        $.each(urls, function (i, url) {
            map[url] = new RegExp(url);
        });

        return map;
    }

    return {

        contains: function (url) {
            if (!map) {
                return false;
            }

            var matches = false;

            $.each(map, function (url, rUrl) {
                if (rUrl.test(location.href)) {
                    matches = true;

                    return false;  // break loop
                }
            });

            return matches;
        },

        init: function (urls) {

            // init(): 
            if (!urls) {

                map = buildMap(store.get(KEY_URLS));

            }
            else { // init(url1, url2, ...)

                var arr = $.isArray(urls) ? urls : $.makeArray(arguments);

                store.set(KEY_URLS, arr);

                map = buildMap(arr);

            }

            console.log(map);

            return this;
        }
    };

}($, store);


var clientAuth = function ($, store) {

    var KEY_UNAME = 'uname',
        NOT_LOG_IN = '未登录',
        urlLogin = 'authTestLogin.html';

    function autoCheck() {

        // check login state every 1s :
        setInterval(function () {

            if (!store.get(KEY_UNAME)) {
                // alert(NOT_LOG_IN);

                location = urlLogin;
            }

        }, 1000);
    }

    return {
        init: function (urls) {

            urlMap.init(urls);

            if (urlMap.contains(location.href)) {
                autoCheck();
            }

        },
    };

}($, store);


