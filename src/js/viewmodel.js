
// constructor, instance data members
function ViewModel(data) {

    this.data = data;

    this.observers = [];

}

// 'instance' methods:
$.extend(ViewModel.prototype, {

    addView: function (view) {
        this.observers.push(view);
    },

    // pass source of change, to prevent infinite loop
    set: function (key, value, src) {

        // no change:
        if (this.data[key] == value) {
            return;
        }

        this.data[key] = value;

        this._notifyChange(key, value, src);

    },

    // private method
    _notifyChange: function (key, value, ignore) {

        $.each(this.observers, function (i, observer) {
            if (ignore != observer) {
                observer.update(key, value);
            }
        });

    },

    toString: function () {
        return 'ViewModel instance';
    },

});

// 'static' methods:
$.extend(ViewModel, {
    create: function (data) {
        return new ViewModel(data);
    },
});

export default ViewModel;
