var frmDetail = function ($) {

    var $frm = $('#frm-detail'),
        $name = $('#name'),
        $uname = $('#uname'),
        $btnPw = $('#btn-pw'),
        $lblPw = $('#lbl-pw'),
        $dept = $('#dept'),
        $btnSave = $('#btn-save'),
        $btnCancel = $('#btn-cancel');

    var frmData,
        state,
        stateNew = function () {

            return {

                apply: function () {

                    frmData = {
                        id: 0,
                        name: '',
                        uname: '',
                        dept: 1
                    };

                    showData(frmData);

                    $btnPw.addClass('new-pw')
                        .prop('disabled', true)
                        .text('1234');

                    $lblPw.text('初始密码');

                    state = this;
                },

                submit: function () {



                    var userData = collectData();

                    console.log('new', userData);

                    $.post('addUser.php', userData, function (data) {

                    }, 'json');
                },

            };

        }(),
        stateEdit = function () {

            return {

                apply: function (data) {

                    frmData = data;

                    showData(data);

                    $btnPw.removeClass('new-pw')
                        .prop('disabled', false)
                        .text('重置为1234');

                    $lblPw.text('重置密码');

                    state = this;
                },

                submit: function () {

                    if (!differ(frmData)) {

                        alert('数据没有更改');

                        return;
                    }

                    var userData = collectChange();

                    console.log(userData);

                    $.post('updateUser.php', userData, function (data) {



                    }, 'json');
                },

            };

        }();

    // test if form data is different from data:
    function differ(data) {
        var different = false;

        $.each([$name, $uname, $dept], function (i, $input) {
            if ($input.val() != data[$input[0].id]) {
                different = true;
                return false;
            }
        });

        return different;
    }



    function showData(data) {
        $name.val(data.name);
        $uname.val(data.uname);
        $dept.val(data.dept);
    }

    function collectData() {
        return {
            name: $name.val(),
            uname: $uname.val(),
            dept: $dept.val()
        };
    }

    function collectChange() {
        var change = {};

        $.each([$uname, $name, $dept], function (i, $input) {
            if ($input.val() != frmData[$input[0].id]) {
                change[$input[0].id] = $input.val();
            }
        });

        change.id = frmData.id;

        return change;
    }



    $frm.submit(function (e) {
        e.preventDefault();

        state.submit();
    });



    return {
        newState: function () {
            stateNew.apply();
        },

        editState: function (data) {
            stateEdit.apply(data);
        },


    };

}($);


var detailPage = function ($) {

    var $aNew = $('#a-new'),
        $aEdit = $('#a-edit');

    var user = {
        id: 3,
        name: '杰克',
        uname: 'jack1',
        dept: 3,

    };


    $aNew.click(function () {

        frmDetail.newState();

    });

    $aEdit.click(function () {

        frmDetail.editState(user);

    });

    return {

    };

}($);
