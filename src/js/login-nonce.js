export default {
    init: function () {
        var deferred =
            this.deferred = $.Deferred();

        $.getJSON('getNonce.php', function (data) {
            deferred.resolve(data);
        });

    }
};

