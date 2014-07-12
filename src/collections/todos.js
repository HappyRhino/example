define([
    "hr/hr",
    "models/todo"
], function(hr, Todo) {
    var STORAGE_KEY = "todos";
    var Todos = hr.Collection.extend({
        model: Todo,

        initialize: function() {
            Todos.__super__.initialize.apply(this, arguments);

            this.listenTo(this, "change add remove", this.saveList);
        },

        loadList: function() {
            this.reset(hr.Storage.get(STORAGE_KEY) || []);
        },
        saveList: function() {
            hr.Storage.set(STORAGE_KEY, this.toJSON());
        }
    });

    return Todos;
});