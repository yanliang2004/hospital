
var data = {
    name: 'Mike',
    uname: 'mike',
    age: 33,
};

var $frm = $('#frm'),
    $btn = $('#btn-save'),
    $input = $('#frm').find('input');

showData(data);

function showData(data) {
    $input.each(function (i, el) {
        el.value = data[el.name];
    });
    updateBtn();
}

$frm.on('input', function (e) {

    updateBtn();

});

function updateBtn() {
    if (isDirty()) {
        $btn.prop('disabled', false);
    }
    else {
        $btn.prop('disabled', true);
    }

}

function isDirty() {
    var bDirty = false;

    $input.each(function(i, el) {
        if (el.value != data[el.name]) {
            bDirty = true;
        }
    })

    return bDirty;
}



