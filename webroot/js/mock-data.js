Mock.mock('dept-user-list.php', genAll);

Mock.mock(/user\.php\?id=\d+/, getUser);


function genAll() {
	var depts = ['心外科', '心内科', '呼吸科', '胸外科', '结核科', '手术麻醉科', '门诊医技', '肿瘤内科', '神经内科', '疼痛科', '内分泌科', '骨科'];
    
    var data = [];
    
    depts.forEach(function (name, i) {
    	
        data[i] = {
            id: i + 1,
            name: name,
            users: getUsers(i + 1)
        };
        
    });
    
    return data;
}

var Rand = Mock.Random;

function getUsers(deptId) {
	
    var arr = new Array(Rand.natural(5, 20));
    
    for (var i = arr.length - 1; i >= 0; --i) {
        arr[i] = Mock.mock({
            id : deptId * 1000 + i + 1,
            uname: '@first',
            name: '@cname'
        });
    }
    
    return arr;
}


function getUser(opt) {

	return {
		id: 0,
		name: '王磊',
		uname: 'wanglei',
		dept: '心内科'
	};
	
}


