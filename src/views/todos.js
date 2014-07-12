define([
    "hr/hr",
    "collections/todos",
    "views/todo"
], function(hr, Todos, TodoView) {
    var TodosView = hr.List.extend({
        Collection: Todos,
        Item: TodoView,
        className: "todos"
    });

    return TodosView;
});