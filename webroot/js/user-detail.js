
var FormGroup = (function () {

	function FormGroup($div) {
		this.$el = $div;
		
		this.$label = $div.find('label');
		
		this.$input = $div.find('input');
		
		
	}
	
	$.extend(FormGroup.prototype, {
		
		setReadOnly: function (isReadOnly) {
			this.$input.prop('readonly', isReadOnly);
		},
		
		
		
	});
	
	
	$.extend(FormGroup, {
		
		create: function ($div) {
			return new FormGroup($div);
		}
		
	});
	
	return FormGroup;

}());


var userDetail = (function () {

	var $userDetail = $('#user-detail');
	
	var $formGroup = $userDetail.find('.form-group');
	
	var arrFormGroup = [];
	
	$formGroup.each(function (i, elem) {
		arrFormGroup[i] = FormGroup.create($(elem));
	});
	
	function setReadOnly(isReadOnly) {
		$.each(arrFormGroup, function (i, formGroup) {
			formGroup.setReadOnly(isReadOnly);
		});
	}
	
	function init() {
		setReadOnly(true);
	}
	
	init();
	
	return {
		
		setReadOnly: setReadOnly,
		
		
	};
	
}());





