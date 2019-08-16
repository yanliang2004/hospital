import { $deptTmpl } from './user-list-dom.js';

import User from './user-list-user.js';

initDeptTmpl();

function initDeptTmpl() {
	$deptTmpl.detach()
             .removeAttr('id');
}

function Dept($parent, data) {
	
    var $el =
    this.$el = $deptTmpl.clone();
    
    this.$deptName = $el.find('.dept-name');
    
    this.$users = $el.find('.users');
    
    this.showData(data);
    
    this.enableToggle();
    
    $el.appendTo($parent);
    
}

$.extend(Dept.prototype, {
    
    showData: function (data) {
    	
        this.$deptName.text(data.name);
        
        var $users = this.$users;
        
        data.users.forEach(function (user, i) {
			// 添加科室名称
			user.dept = data.name;
			
        	User.create($users, user);
        });
        
    },
    
    enableToggle: function () {
    	var $el = this.$el,
            $aToggle = $el.find('.a-toggle');
        
        $aToggle.click(function (e) {
        	e.preventDefault();
            
            $el.toggleClass('collapsed');
			
        });
    },
    
	collapse: function () {
		this.$el.addClass('collapsed');
	},
	
	expand: function () {
		this.$el.removeClass('collapsed');
	},
	
});

$.extend(Dept, {
    
    create: function ($parent, data) {
    	return new Dept($parent, data);
    },
    
});

export default Dept;

