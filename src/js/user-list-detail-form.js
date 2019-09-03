import { $detail } from './user-list-dom.js';

import PwField from './user-list-form-pw.js';

var frmUser = function () {

	var $frm = $detail.find('#frm-user'),
		$hl = $frm.find('#detail-hl'),
		$name = $frm.find('#name'),
		$uname = $frm.find('#uname'),
		$dept = $frm.find('#dept'),
		$btnSave = $frm.find('#btn-save');

	var pwField = new PwField(
		$frm.find('#reset-pw'),
		$frm.find('#label-reset-pw')
	);

	var data, state;

	// state pattern
	var stateNew = function () {

		function collectFormData() {
			return {
				name: $name.val(),
				uname: $uname.val(),
				dept: $dept.val()
			};
		}

		function onPostResult(data) {
			
			console.log(data);

			unfreeze();
		}

		return {

			apply: function () {
				$hl.text('新增用户');
				$name.val('');
				$uname.val('');
				pwField.setStateNew();
			},

			submit: function () {

				$.post('addUser.php', collectFormData(), onPostResult, 'json');

			},

		};

	} ();

	// state pattern
	var stateEdit = function () {

		function updatedFields() {
			var fields = {};

			$.each([$name, $uname, $dept], function (i, $input) {
				var key = $input[0].name,
					value = $input.val();

				if (data[key] != value) {
					fields[key] = value;
				}
			});

			fields.id = data.id;
			
			return fields;
		}

		function onPostResult(data) {
			
			console.log(data);

			unfreeze();
		}


		return {

			apply: function () {
				$hl.text('修改用户信息');
				$name.val(data.name);
				$uname.val(data.uname);
				$dept.val(data.deptId);
				pwField.setStateEdit();
			},

			submit: function () {
				$.post('updateUser.php', updatedFields(), onPostResult, 'json');
			},

		};

	} ();



	var validator = $frm.validate({
		success: 'valid',
		submitHandler: function () {
			freeze();
			state.submit();
		}
	});


	// when submitting, freeze form
	function freeze() {
		$.each([$name, $uname, $dept], function (i, $input) {
			$input.prop('readonly', true);
		});
		
		pwField.freeze();

		$btnSave.prop('disabled', true);

		
	}

	function unfreeze() {
		$.each([$name, $uname, $dept], function (i, $input) {
			$input.prop('readonly', false);
		});
		
		pwField.unfreeze();

		$btnSave.prop('disabled', false);
	}


	return {

		setData: function (d) {
			data = d;

			// console.log('frm.setData(): ' + JSON.stringify(data));

		},

		setStateNew: function () {
			state = stateNew;
			state.apply();
		},

		setStateEdit: function () {

			console.log('frm.setStateEdit(): ' + JSON.stringify(data));


			state = stateEdit;
			state.apply();
		},

	};

} ();


export default frmUser;
