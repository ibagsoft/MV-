requirejs.config({
	baseUrl: 'lib'
});
requirejs(['angular'], function() {
	var app = angular.module('app', []);
	app.controller('ProductCtrl', ['$scope', function($scope) {
		$scope.product = {
			name: 'Web MVC',
			done: false
		}
	}])
});