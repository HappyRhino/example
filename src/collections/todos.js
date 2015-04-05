var Collection = require("hr.collection");
var storage = require("hr.storage");

var Todo = require("../models/todo");

// Key to store todos in localstorage
var STORAGE_KEY = "todos";

var Todos = Collection.extend({
    model: Todo,

    initialize: function() {
        Todos.__super__.initialize.apply(this, arguments);

        // Save collection when change
        this.listenTo(this, "change add remove", this.saveInStorage);
    },

    loadFromStorage: function() {
        this.reset(storage.get(STORAGE_KEY) || []);
    },
    saveInStorage: function() {
        storage.set(STORAGE_KEY, this.toJSON());
    }
});

module.exports = Todos;
