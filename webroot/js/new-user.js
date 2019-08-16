
var part = {
	
	setStateNew: function () {
		
	},
	
	setStateEdit: function () {
		
	},
	
};

var frmHeadline = (function () {
	
	var $headline = $('#frm-headline');
	
	function setStateNew() {
		$headline.text('新增用户');
	}
	
	function setStateEdit() {
		$headline.text('修改用户信息');
	}
	
	return {
		setStateNew: setStateNew,
		setStateEdit: setStateEdit,
	};

}());

var fieldPw = (function () {

	var $group = $('#field-pw'),
		$label = $group.find('label'),
		$btn = $group.find('#pw');

	function setStateNew() {
		$label.text('初始密码');
		$btn.val('1234');
		
	}
	
	function setStateEdit() {
		$label.text('重置密码');
		$btn.val('重置为 1234');
	}
	
	return {
		setStateNew: setStateNew,
		setStateEdit: setStateEdit,
	};
	
}());

var FormGroup = (function () {

	function FormGroup($el) {
		
		this.$el = $el;
		
		this.$label = $el.find('label');
		
		this.$input = $el.find('input');
		
	}
	
	
	$.extend(FormGroup.prototype, {
		
		
		
	});
	
	$.extend(FormGroup, {
		
		
		
	});
	
	return FormGroup;

}());


var frmDetail = (function () {

	var $frm = $('#frm-detail');
	
	var parts = [ 
		frmHeadline, 
		fieldPw
	];
	
	function setStateNew() {
		$.each(parts, function (i, part) {
			part.setStateNew &&
			part.setStateNew();
		});
	}
	
	function setStateEdit() {
		$.each(parts, function (i, part) {
			part.setStateEdit &&
			part.setStateEdit();
		});
	}
	
	function init() {
		
	}
	
	init();
	
	return {
		setStateNew: setStateNew, 
		setStateEdit: setStateEdit,
	};
	
	
	
}());

