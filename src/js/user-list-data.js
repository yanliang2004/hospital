
var Data = {

    getDeptUserList: function (fn) {
        $.getJSON('dept-user-list.php', function (data) {
            fn(data);
        });
    },

    getUser: function (id, fn) {
        $.getJSON('user.php', { id: id }, function (data) {
            fn(data);
        });
    },

    saveUser: function (userData, fn) {

        $.post('addUser.php', userData, function (data) {
            fn(data);
        });

    },

    // reset pw to 1234
    resetPw: function (id, fn) {
        $.post('resetPw.php', { id: id }, fn);
    },

};


export default Data;