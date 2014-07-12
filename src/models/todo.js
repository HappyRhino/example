define([
    "hr/hr"
], function(hr) {
    var Todo = hr.Model.extend({
        defaults: {
            title: "",
            done: false
        }
    });

    return Todo;
});