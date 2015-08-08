requirejs.config({
	baseUrl: 'lib'
});
requirejs(['jquery', 'underscore', 'handlebars', 'backbone'], function($) {
	var app = (function() {
		Backbone.$ = $;
		Backbone.Presenter = Backbone.View.extend();
		_.extend(Backbone.Presenter, {
			constructor: Backbone.Presenter
		});

		var Product = Backbone.Model.extend({
			defaults: {
				name: undefined,
				done: false
			}
		});
		var product = new Product({
			name: 'Web MVC',
			done: false
		});

		var Presenter = Backbone.Presenter.extend({
			tagName: 'div',
			template: Handlebars.compile($('#tmpl').html()),
			initialize: function(model) {
				this.model = model;
				this.model.on('change:done', this.update, this);
				this.render();
				this.$el.appendTo(document.body);
			},
			update: function() {
				this.render();
			},
			render: function() {
				this.$el.html(this.template(this.model.toJSON()));
			},
			events: {
				'click input': 'changeHandle'
			},
			changeHandle: function() {
				this.model.set({
					done: !this.model.get('done')
				});
			}
		});

		var presenter = new Presenter(product);

		return {
			model: product,
			presenter: presenter,
			view: presenter.$el
		}
	})();
});