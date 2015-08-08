requirejs.config({
	baseUrl:'lib'
});
define([],function() {
	var model = {
		name:'Web MVC',
		done:false
	}
	var actions = flux.createActions(['changeHandle']);
	var store = flux.createStore({
		product:model,
		actions:[actions.changeHandle],
		changeHandle:function(e) {
			console.log(e);
		},
		exports:{
			getProduct:function() {
				return this.product;
			}
		}
	});
	return{
		model:model,
		actions:actions,
		store:store
	}
});