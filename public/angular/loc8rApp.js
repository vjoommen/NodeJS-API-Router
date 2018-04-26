angular.module('loc8rApp', []);

var loc8rData = function($http){
	// return [{
	// 		name: 'Burger Queen',
	// 		address: 'Address 5 for burger',
	// 		rating: 4,
	// 		facilities: ['Hot drinks','Wifi'],
	// 		distance: '23',
	// 		_id: '123123123123123123'
	// 	},{
	// 		name: 'Burger King',
	// 		address: 'Address 2 for burger',
	// 		rating: 3,
	// 		facilities: ['Hot cofee'],
	// 		distance: '34',
	// 		_id: '123123123123123143'
	// 	}];

	// var data =  
	// console.log('Response from API .... ');
	// console.log(data);
	return $http.get('/api/locations');
};

var locationListCtrl = function ($scope, loc8rData){
	$scope.message = "Searching for nearby places";
	loc8rData
		.success(function(data){
			$scope.message = data.length > 0 ? "" : "No records found";
			$scope.data = { locations: data };		
		})
		.error(function(e){
			$scope.message = "Sorry.. something went wrong";
			console.log(e);
		});	
};

var _isNumeric = function (n){
	return !isNaN(parseFloat(n)) && isFinite(n);
};

var formatDistance = function(){
	return function (distance) {
		var numDistance, unit;
		if (distance && _isNumeric(distance)){
			 if(distance > 1){
			 	numDistance = parseFloat(distance).toFixed(1);
			 	unit = 'km';
			 }else{
			 	numDistance = parseInt(distance *1000,10);
			 	unit = 'm';
			 }
			 return numDistance + unit;
		}else{
			return '?';
		}
	};
};

var ratingStars = function(){
	return {
		scope:{
			thisRating: '=rating'
		},
		templateUrl : '/angular/rating-stars.html'
	};
};

angular
	.module('loc8rApp')
	.controller('locationListCtrl', locationListCtrl)
	.filter('formatDistance', formatDistance)
	.directive('ratingStars', ratingStars)
	.service('loc8rData', loc8rData);