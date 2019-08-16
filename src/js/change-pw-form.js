import Va from './va.js';


var $newPw = $('#new-pw'),
    $lblNewPw = $('label[for="new-pw"]'),
    $newPw2 = $('#new-pw2'),
    $lblNewPw2 = $('label[for="new-pw2"]'),
    $btnChange = $('#btn-change');


init();

function init() {

    Va.required({
        $input: $newPw,
        $label: $lblNewPw,
        errMsg: '请输入新密码',
        errClass: 'error'
    });

    Va.required({
        $input: $newPw2,
        $label: $lblNewPw2,
        errMsg: '请再次输入新密码',
        errClass: 'error'
    });

    Va.equal({
        $input1: $newPw,
        $input2: $newPw2,
        $label: $lblNewPw2,
        errMsg: '两次输入的密码不一致',
        errClass: 'error'
    });

}



