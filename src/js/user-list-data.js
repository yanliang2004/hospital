
var Data = {
    
    getDeptUserList: function (fn) {
    	$.getJSON('dept-user-list.php', function (data) {
    		fn(data);
    	});
    },
    
    getUser: function (id, fn) {
    	$.getJSON('user.php', {id: id}, function (data) {
            fn(data);
    	});
    },
    
    saveUser: function (userData, fn) {
        
        $.post('addUser.php', userData, function(data) {
            fn(data);
        });

    },

};


export default Data;