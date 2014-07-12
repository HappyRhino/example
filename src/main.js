require([
    "hr/utils",
    "hr/dom",
    "hr/promise",
    "hr/hr",
    "hr/args",
    "resources/init",
    "views/todos",
    "text!resources/templates/main.html",
], function(_, $, Q, hr, args, resources, TodosView, templateContent) {
    // Configure hr
    hr.configure(args);

    // Define base application
    var Application = hr.Application.extend({
        name: "Todos",
        template: templateContent,
        events: {
            "keydown .input input": "onInputKeydown",
            "click .do-clear-completed": "onClearCompleted"
        },
        routes: {
            "filter/:id": "filterList"
        },

        initialize: function() {
            Application.__super__.initialize.apply(this, arguments);

            this.todos = new TodosView({}, this);
            this.listenTo(this.todos.collection, "change add remove reset", function() {
                // Update title of page with count of non completed
                this.title(String(this.todos.collection.where({done: false}).length));

                // Update button "clear completed"
                this.$(".count-completed").text(this.todos.collection.where({done: true}).length);
            });

            this.todos.collection.loadList();
        },

        finish: function() {
            this.todos.appendTo(this.$(".list"));
            this.$(".count-completed").text(this.todos.collection.where({done: true}).length);
            return Application.__super__.finish.apply(this, arguments);
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

            var q = $input.val();
            this.todos.collection.unshift({
                title: q,
                date: Date.now()
            });

            $input.val("");
        },

        onClearCompleted: function(event) {
            if (event) event.preventDefault();

            this.todos.collection.each(function(model) {
                if (model.get("done")) model.destroy();
            });
        }
    });

    var app = new Application();
    resources().then(app.run.bind(app)).then(app.router.start.bind(app.router));
});
