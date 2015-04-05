var View = require("hr.view");
var ListItem = require("hr.list").Item;
var templateContent = require("../resources/templates/todo.html");

var TodoView = ListItem
.inherit(View.Template)
.extend({
    template: templateContent,
    className: "todo",
    events: {
        "keydown input[type='text']":       "onInputKeydown",
        "keyup input[type='text']":         "onInputKeyup",
        "change input[type='checkbox']":    "onChangeDone",
        "click .do-remove-todo":            "onRemove"
    },

    onChangeDone: function() {
        this.model.set("done", !this.model.get("done"));
    },

    onRemove: function(event) {
        if (event) event.preventDefault();
        this.model.destroy();
    },

    onInputKeydown: function(event) {
        if (event.which == 13) return event.preventDefault();
    },

    onInputKeyup: function(event) {
        var $input = $(event.currentTarget);
        this.model.set("title", $input.val(), { silent: true });
        this.model.collection.saveList();
    },
});

module.exports = TodoView;
