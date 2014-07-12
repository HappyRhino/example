define([
    "hr/hr",
    "text!resources/templates/todo.html"
], function(hr, templateContent) {
    var TodoView = hr.List.Item.extend({
        template: templateContent,
        className: "todo",
        events: {
            "change input[type='checkbox']": "onChangeDone"
        },

        onChangeDone: function() {
            this.model.set("done", !this.model.get("done"));
        }
    });

    return TodoView;
});