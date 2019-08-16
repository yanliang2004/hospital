var $frm = $('#frm-user'),
    inputs = {
        'uname': $frm.find('#uname'),
        'name' : $frm.find('#name'),
        'deptId' : $frm.find('#dept')
    },
    labels = {
        'uname': $frm.find('#msg-uname'),
        'name' : $frm.find('#msg-name'),
        'deptId' : $frm.find('#msg-dept')
    };

var validator = $frm.validate({
    success: 'valid',
    submitHandler: ajaxSubmit
});

function ajaxSubmit() {

    var data = {
        name: inputs.name.val(),
        uname: inputs.uname.val()
    };

    $.post('addUser.php', data, function(res){
        
        var dat = JSON.parse(res);

        console.log(dat);

        onResponse(dat);
        
    });


}

function onResponse(data) {

    switch (data.code) {
        case 0: // success
            onResponseSuccess(data);
        break;

        case 1: // validation fail
            onResponseValidationFail(data);
        break;

        case 2: // insertion fail
            onResponseDBFail(data);
        break;
    }
    
}

function onResponseSuccess(data) {
    alert('成功');
}

function onResponseValidationFail(data) {
    validator.showErrors(data.result);
}

function onResponseDBFail(data) {
    alert('DB insert fail');
}


function showFieldError(field, msg) {
    inputs[field].addClass('error');

    labels[field].text(msg);
}
