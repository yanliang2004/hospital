var dataList = makeList(60);

function makeList(n) {
    var list = new Array(n);

    for (var i = 0; i < n; ++i)
    {
        list[i] = {
            id: i + 1,
            name: Mock.mock('@cname')
        };
        
    }

    return list;
}


var data = function () {
    
    var cache = {};


    return {
        get: function (id, fn) {
            
            if (id in cache)
            {
                fn(cache[id]);

                return;
            }
            
            $.getJSON(
                'dataTest.php',
                {id: id},
                function (data) {
                    cache[id] = data;
                    fn(data);
                }
            );

        },

        set: function (id, data) {

        },

        showCache: function () {
            console.log(cache);
        },
    };

}();

tryGetUsers(30);

function tryGetUsers(n) {
    while (--n >= 0)
    {
        var id = Math.floor(60 * Math.random());

        data.get(id, function(data) { console.log(data.id); });
    }
}
