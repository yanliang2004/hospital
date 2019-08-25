

function PwField($btn, $label) {
    this.$btn = $btn;
    this.$label = $label;

    this.stateNew = initStateNew($btn, $label);
    this.stateEdit = initStateEdit($btn, $label);

    this.setStateNew();

    var state = this.state;

    this.$btn.click(function (e) {

        state.onclick(e);

    });


}

function initStateNew($btn, $label) {
    return {
        apply: function () {
            $label.text('初始密码');
            $btn.text('1234')
                .prop('disabled', true)
                .removeClass('active');
        },

        freeze: function () {
            // no operation
        },

        unfreeze: function () {
            // no operation
        },

        onclick: function (e) {
            // no operation
        }

    };
}

function initStateEdit($btn, $label) {
    return {
        apply: function () {
            $label.text('密码');
            $btn.text('重置为 1234')
                .prop('disabled', false)
                .addClass('active');

        },

        freeze: function () {
            $btn.prop('disabled', true);
        },

        unfreeze: function () {
            $btn.prop('disabled', false);
        },

        // reset pw
        onclick: function () {

        }


    };
}

$.extend(PwField.prototype, {

    setStateNew: function () {
        this.state = this.stateNew;
        this.state.apply();
    },

    setStateEdit: function () {
        this.state = this.stateEdit;
        this.state.apply();
    },

    freeze: function () {

        this.state.freeze();

    },

    unfreeze: function () {
        this.state.unfreeze();
    },

});

$.extend(PwField, {

    instance: function ($input, $label) {
        return new PwField($input, $label);
    },

});


export default PwField;
