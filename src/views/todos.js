var ListView = require("hr.list");

var Todos = require("../collections/todos");
var TodoItem = require("./todo");

var TodosView = ListView.extend({
    Collection: Todos,
    Item: TodoItem,
    className: "todos"
});

module.exports = TodosView;
