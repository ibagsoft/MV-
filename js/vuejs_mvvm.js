requirejs.config({
	baseUrl:'lib'
});
requirejs(['jquery','vue','handlebars'],function($,Vue) {
	var vm = new Vue({
		el:'#product',
		data:{
			product:{
				name:'Web MVC',
				done:false
			}
		},
		methods:{
			changeHandle:function(e) {
				this.product.done = !this.product.done;
			}
		},
		components:{
			'product':{
				created:function() {
					console.log('render done.');
				},
				props:['name','done'],
				template:$('#tmpl').html()
			}
		}
	});
});