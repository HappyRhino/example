define([
    "hr/hr",
    "text!resources/templates/todo.html"
], function(hr, templateContent) {
    var TodoView = hr.List.Item.extend({
        template: templateContent,
        className: "todo",
        events: {
            "change input[type='checkbox']": "onChangeDone",
            "click .do-remove-todo": "onRemove"
        },

        onChangeDone: function() {
            this.model.set("done", !this.model.get("done"));
        },

        onRemove: function(event) {
            if (event) event.preventDefault();
            this.model.destroy();
        }
    });

    return TodoView;
});