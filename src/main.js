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
            "page/:id": "showPage"
        },

        initialize: function() {
            Application.__super__.initialize.apply(this, arguments);

            this.todos = new TodosView({}, this);
            this.todos.collection.loadList();
        },

        finish: function() {
            this.todos.appendTo(this.$(".list"));
            return Application.__super__.finish.apply(this, arguments);
        },

        showPage: function(id) {

        },

        onInputKeydown: function(event) {
            var $input = $(event.currentTarget);
            if (event.which != 13) return;
            event.preventDefault();

            var q = $input.val();
            this.todos.collection.add({
                title: q
            });

            $input.val("");
        }
    });

    var app = new Application();
    resources().then(app.run.bind(app));
});
