define([
    "hr/hr",
    "text!resources/templates/todo.html"
], function(hr, templateContent) {
    var TodoView = hr.List.Item.extend({
        template: templateContent,
        className: "todo",
        events: {
            "keydown input[type='text']": "onInputKeydown",
            "keyup input[type='text']": "onInputKeyup",
            "change input[type='checkbox']": "onChangeDone",
            "click .do-remove-todo": "onRemove"
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

    return TodoView;
});