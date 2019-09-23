

var data = function () {
    
    var data = {};

    return {

        $msg: $({}),

        // notify: bool, if true, notify change
        set: function (key, value, notify) {
            if (data[key] != value) {

                data[key] = value;

                notify && 
                this.$msg.trigger('datachange', key, value);

            }
        },

        get: function (key) {
            return data[key];
        },



    };

}();

var Gender = function () {
    
    function Gender($box) {
        
    }

    $.extend(Gender.prototype, {
        
    });

    

    return Gender;

}();

var viewForm = function () {
    
    var $frm = $('#frm-view'),
        inputs = {
            uname: $('#uname'),
            name: $('#name'),
            gender: new Gender($('#gender')),
            dept: $('#dept'),
        };
        

    return {

        show: function (key, value) {
            inputs[key].val(value);
        },



    };


}();

var viewData = function () {
    
}();




