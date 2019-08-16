/**
 * 功能： 
 * 
 * 
 * 
 */


var frm = function () {

    var $frm = $('#frm-user'),
        $name = $frm.find('#name'),
        $uname = $frm.find('#uname'),
        $dept = $frm.find('#dept'),
        $btnSave = $frm.find('#btn-save');
    
    var data, state;

    var stateNew = function () {

        function getFormData() {
            var fd = {};

            $.each([$name, $uname, $dept], function (i, $input) {
                fd[$input[0].name] = $input.val();
            });

            return fd;
        }

        return {
            init: function () {
                $name.val('');
                $uname.val('');
                $dept.val('');
                $btnSave.attr('disabled', true);


            },

            submit: function () {
                console.log('add user: ');
                console.log(getFormData());
            }

        };

    } ();

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

            return fields;
        }

        return {
            init: function () {

                $name.val(data.name);
                $uname.val(data.uname);
                $dept.val(data.dept);

                $btnSave.attr('disabled', true);
            },

            submit: function () {
                console.log('update user');
                console.log(updatedFields());
            }
        }

    } ();

    $frm.on('input', function (e) {

        updateBtn();

    });

    $btnSave.click(function(e) {
        e.preventDefault();

        $btnSave.attr('disabled', true);

        state.submit();
    });


    function isDirty() {
        
        var dirty = false;

        $.each(
            [$name, $uname, $dept],
            function (i, $input) {

                if ($input.val() != data[$input[0].name]) {
                    dirty = true;
                }

            }
        );

        return dirty;

    }

    function updateBtn() {
        $btnSave.attr('disabled', !isDirty())
    }



    return {
        setData: function (dat) {
            data = dat;
        },

        setStateNew: function () {
            state = stateNew;
            stateNew.init();
        },

        setStateEdit: function () {
            state = stateEdit;
            stateEdit.init();
        },

    };

} ();

frm.setData({
    name: '按摩完  ',
    uname: 'amm',
    dept: 'social'
});

frm.setStateEdit();



