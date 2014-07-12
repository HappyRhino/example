define([
    "hr/hr",
    "text!resources/templates/todo.html"
], function(hr, templateContent) {
    var TodoView = hr.List.Item.extend({
        template: templateContent,
        className: "todo"
    });

    return TodoView;
});