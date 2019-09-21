var $frm = $('#frm');

$frm.change(onchange);

// $frm.keydown(onkeydown);

function onchange(e) {
    console.log(e.target.id, '[' + e.type + ']');
}

function onkeydown(e) {
    console.log(e.target.id, '[' + e.type + ']', 'which: ' + e.which);
}

