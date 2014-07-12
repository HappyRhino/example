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
        name: "Example",
        template: templateContent,
        events: {
            "keydown .input input": "onInputKeydown"
        },
        routes: {
            "filter/:id": "filterList"
        },

        initialize: function() {
            Application.__super__.initialize.apply(this, arguments);

            this.todos = new TodosView({}, this);
            this.listenTo(this.todos.collection, "change add remove reset", function() {
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
        }
    });

    var app = new Application();
    resources().then(app.run.bind(app)).then(app.router.start.bind(app.router));
});
