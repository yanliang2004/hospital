var frm = (function () {

	var $frm = $('#frm-user'),
		$input = $frm.find('#name, #dept'),
		$btnSave = $frm.find('#btn-save'),
		$toggle = $frm.find('#toggle-edit');
	
	
	function init() {
		
		readonly();
		
		$toggle.change(function () {
			
			this.checked ? 
				edit() :
				readonly();
				
		});
		
	}
	
	function edit() {
		
		isEditable = true;
		
		$input.attr('readonly', false);
		
		$btnSave.show();
	}
	
	function readonly() {
		$input.attr('readonly', true);
		
		$btnSave.hide();
	}
	
	init();
	
	return {
		
	};

}());




