var Model = require("hr.model");

var Todo = Model.extend({
    defaults: {
        title: "",
        done: false,
        date: 0
    }
});

module.exports = Todo;
