import { $detail } from './user-list-dom.js';
import $hub from './events.js';

var $frm = $detail.find('#frm-user'),
	$inputFields = $('.input-field'),
	validator = $frm.validate({
		success: 'valid',
		submitHandler: ajaxSubmit
	});



function getInputs() {
	
	var data = {};

	$inputFields.each(function (i, el) {
		data[el.name] = el.value;
	});

	return data;
}

// new | update (dirty | not)
function ajaxSubmit() {
	$.post(
		'addUser.php',
		getInputs(),
		function (res) {
			var data = $.parseJSON(res);

			onResponse(data);
		}
	);
}

function onResponse(data) {
	switch (data.code)	{
		case 0: // success
			onResponseSuccess(data);
		break;

		case 1: // validation fail
			onResponseValidationFail(data);
		break;

		case 2: // insert fail
			onResponseDBFail(data);
		break;
	}
}

function onResponseSuccess(data) {


	
}



export default {

	

};
