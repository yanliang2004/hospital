


function required(opt) {

    opt.$label.each(function (i, el) {
        $.data(el, 'orig-content', el.innerHTML);
        $.data(el, 'err-content', el.innerHTML + wrapMsg(opt.errMsg));
    });

    opt.$input.blur(function () {
        checkRequired(opt);
    });

    opt.$input.keyup(function () {
        checkRequired(opt);
    });

}

function checkRequired(opt) {

    var isValid = !!$.trim(opt.$input.val());

    opt.$input.data('valid', isValid);

    opt.$input.toggleClass(opt.errClass, !isValid);

    opt.$label.toggleClass(opt.errClass, !isValid);

    opt.$label.each(function (i, el) {
        el.innerHTML = $.data(el, isValid ? 'orig-content' : 'err-content');
    });
}

function wrapMsg(msg) {
    return ' (' + msg + ') ';
}

function validate() {

    for (var i = arguments.length - 1; i >= 0; --i) {
        var $input = arguments[i];

        if (!$input.data('valid')) {
            return false;
        }
    }
    return true;
}

function equal(opt) {

    opt.$label.each(function (i, el) {
        $.data(el, 'orig-content', el.innerHTML);
        $.data(el, 'err-content', el.innerHTML + wrapMsg(opt.errMsg));
    });

    opt.$input2.keyup(function () {
        checkEqual(opt);
    });

    opt.$input2.blur(function () {
        checkEqual(opt);
    });


}

function checkEqual(opt) {

    var valid = opt.$input1.val() == opt.$input2.val();

    $input2.data('valid', valid);

    opt.$input2.toggleClass(opt.errClass, !valid);

    opt.$label.toggleClass(opt.errClass, !valid);

    opt.$label.html($opt.label.data(valid ? 'orig-content' : 'err-content'));

}


export default {

    required: required,
    equal: equal,
    validate: validate
};