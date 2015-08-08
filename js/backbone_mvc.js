requirejs.config({
	baseUrl: 'lib'
});
requirejs(['jquery', 'underscore', 'handlebars', 'backbone'], function($) {
	var app = (function() {
		Backbone.$ = $;
		var ProductView = Backbone.View.extend({
			tagName: 'div',
			template: Handlebars.compile($('#tmpl').html()),
			initialize: function(model, controller) {
				this.model = model;
				this.model.on('change:done', this.update, this);
				this.render();
				for (var attr in controller) {
					this[attr] = controller[attr];
				}
				this.delegateEvents.call(this, this.events);
			},
			update: function() {
				this.render();
			},
			render: function() {
				this.$el.html(this.template(this.model.toJSON()));
			}
		});
		var Product = Backbone.Model.extend({
			defaults: {
				name: undefined,
				done: false
			}
		});
		var controller = {
			events: {
				'click input': 'changeHandle'
			},
			changeHandle: function() {
				this.model.set({
					done: !this.model.get('done')
				});
			}
		};
		var product = new Product({
			name: 'Web MVC',
			done: false
		});
		var productView = new ProductView(product, controller);
		
		return {
			model: product,
			controller: controller,
			view: productView
		}
	})();

	app.view.$el.appendTo(document.body);
});