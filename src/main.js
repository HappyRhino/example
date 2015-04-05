var $ = require("jquery");
var Q = require("q");
var _ = require("hr.utils");
var Application = require("hr.app");
var View = require("hr.view");

var TodosView = require("./views/todos");
var templateContent = require("./resources/templates/main.html");

var TodoApplication = Application
.inherit(View.Template)
.extend({
    name: "Todos",
    template: templateContent,
    events: {
        "keydown .input input": "onInputKeydown",
        "click .do-clear-completed": "onClearCompleted",
        "change .do-select-languages": "onLangChange"
    },
    routes: {
        "filter/:id": "filterList"
    },

    initialize: function() {
        TodoApplication.__super__.initialize.apply(this, arguments);

        this.todos = new TodosView({}, this);
        this.listenTo(this.todos.collection, "change add remove reset", this.onCountChanged);

        this.todos.collection.loadFromStorage();
    },

    render: function() {
        this.todos.detach();
        return TodoApplication.__super__.render.apply(this, arguments);
    },

    finish: function() {
        this.todos.appendTo(this.$(".list"));
        this.onCountChanged();
        return TodoApplication.__super__.finish.apply(this, arguments);
    },

    filterList: function(id) {
        this.todos.filter(function(model) {
            if (id == "all") return true;
            if (id == "completed") return model.get("done");
            return !model.get("done");
        });
    },

    onInputKeydown: function(event) {
        var $input = $(event.currentTarget);
        if (event.which != 13) return;
        event.preventDefault();

        this.todos.collection.unshift({
            title: $input.val(),
            date: Date.now()
        });

        $input.val("");
    },

    onClearCompleted: function(event) {
        if (event) event.preventDefault();

        this.todos.collection.filter(function(model) {
            return model.get("done");
        }).forEach(function(model) {
            model.destroy();
        });
    },

    onCountChanged: function() {
        // Update title of page with count of non completed
        this.head.title(String(this.todos.collection.where({done: false}).length));

        // Update button "clear completed"
        this.$(".count-completed").text(this.todos.collection.where({done: true}).length);
    }
});

var app = new TodoApplication();
app.router.start();
app.update();
