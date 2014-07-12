define([
    "hr/hr"
], function(hr) {
    var Todo = hr.Model.extend({
        defaults: {
            title: "",
            done: false,
            date: 0
        }
    });

    return Todo;
});