import page from './user-list-page.js';
import { $detail } from './user-list-dom.js';

import form from './user-list-detail-form.js'

$detail.detach();

var detailPage = Object.create(page);
	
$.extend(detailPage, {
    
    init: function () {
    	
		this.$el = $detail;
		
		this.$hl = $detail.find('#detail-hl');
		
		this.$inputName = $detail.find('#name');
		
		this.$inputUname = $detail.find('#uname');
		
		this.$inputDept = $detail.find('#dept');
		
		this.$btnSave = $detail.find('#btn-save');
		
		this.$btnResetPw = $detail.find('#reset-pw');
		
		this.$labelResetPw = $detail.find('#label-reset-pw');
		
		
    },
	
    show: function (args) {
    	
        this.$el.show();
		
		if (args.id) {
			this.showUser(args);
		}
		else {
			this.newUser();
		}
		
    },
    
	showUser: function (data) {
		this.$inputName.val(data.name);
		this.$inputUname.val(data.uname);
		this.$inputDept.val(data.dept);
		this.id = data.id;
		
		this.setStateEdit();
	},
	
	newUser: function () {
		this.$inputName.val('');		
		this.$inputUname.val('');		
		this.$inputDept.val('');
		this.id = 0;
		
		this.setStateNew();
	},
	
	setStateEdit: function () {
		this.$hl.text('修改用户信息');
		
		this.$labelResetPw
			.text('重置密码');
		
		this.$btnResetPw
			.text('重置为 1234')
			.addClass('active');

	},
	
	setStateNew: function () {
		this.$hl.text('新增用户');
		
		this.$labelResetPw
			.text('初始密码');
		
		this.$btnResetPw
			.text('1234')
			.removeClass('active');

	},
	
});

detailPage.init();

export default detailPage;




