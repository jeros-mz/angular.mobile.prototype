/*	
 *	lotteMall East-Busan
 *	
 *	Copyright (c) 2014 MZ
 *
 *	Dual licensed under the MIT and GPL licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */
var app = angular.module('app', [
	'ngRoute',
	'main',
	'floor',
	'viewer',
	'api'
]);

app.constant('appConfig', {
	title : 'title'
});

app.config(['$routeProvider', '$locationProvider', function( $routeProvider, $locationProvider){
	
	console.log('app.config');
	
	$routeProvider
		.when('/', {
			redirectTo : '/Main'
		})
		.when('/Main',{
			templateUrl : '/pages/main.html',
			controller : 'mainController'
		});
}]);

app.run(['api', function (api) {
	console.log('app.api');
}]);

app.service('api', ['$http', '$q', function($http, $q){
	
	var data;
	
	function handleError( response ) {
	 
		// The API response from the server should be returned in a
		// nomralized format. However, if the request was not handled by the
		// server (or what not handles properly - ex. server error), then we
		// may have to normalize it on our end, as best we can.
	    if (
	        ! angular.isObject( response.data ) ||
		    ! response.data.message
	    ) {
	 
	        return( $q.reject( "An unknown error occurred." ) );
	 
	    }
	
	    // Otherwise, use expected error message.
        return( $q.reject( response.data.message ) );
    }
                
    // I transform the successful response, unwrapping the application data
    // from the API response payload.
    function handleSuccess( response ) {
        return( response.data );
    }
         
    return {
    	get : function (url) {
    		
    		console.log('api.get');
		    
		    var request = $http({
		    	method : 'get',
		    	url : url,
		    	params : {
		    		aa : 'aa'
		    	}
		    });
		    
		    
		    // console.log(request);
		    
		    return (request.then(handleSuccess, handleError));
    	}
    };
}]);

app.service('floorService', ['api',  function(api){
	
    return {
    	getFloors : function () {
    		
    		console.log('floorService.getFloors');
    		
    		var url = '/temp/floor.json';
    		var r = api.get(url);
    		
    		
    		return r.then(function (floors){
				return floors;
			});	
    	}
    };
}]);

app.service('shopService', ['api',  function(api){
	
    return {
    	getShops : function () {
    		
    		console.log('shopService.getShops');
    		
    		var url = '/temp/floor.json';
    		var r = api.get(url);
    		
    		return r.then(function (floors){
				return floors;
			});	
    	}
    };
}]);

app.directive('appTitle', ['api', function(api){
	
	console.log('directive.appTitle');
	
	return {
		restrict : 'A',
		templateUrl : '/pages/title.html',
		replace : false,
		controller : 'headerController',
		compile : function () {
			console.log('2');
		}
	};
}]);

app.controller('headerController', ['$scope', 'floorService', 'shopService',  function($scope, fService, shopService) {
	
	console.log('app.headerController');
	
	fService.getFloors().then(function (floors){
		
		$scope.title = floors.floors[0].category;
	});
	
	shopService.getShops().then(function (floors){
		
		$scope.shopTitle = floors.floors[0].category;
	});
}]);

app.controller('footerController', ['$scope', function($scope) {
	
	console.log('app.footerController');
	console.log($scope);
	
	
}]);

app.controller('mainController', ['$scope', '$document', 'viewFactory', function($scope, $document, viewFactory) {
	
	console.log('app.mainController');
	
	var body = $document[0].body;
	
	console.log(viewFactory);
	viewFactory.aaa();
	
	
	$scope.showMap = function () {
		
		var attr = body.getAttribute('class') || '';
		// console.log(attr);
		
		
		// $('#viewer').attr('vw-map', 'vw-map');
		
		
		viewFactory.aaa();
		// $scope.$apply();
	};
}]);




var viewer = angular.module('viewer', ['app']);

viewer.config([function(){
	
	console.log('viewer.config');
}]);

viewer.directive('vwMap', [function(){
	
	return {
		restrict : 'A',
		templateUrl : '/pages/viewer.html',
		replace : false,
		controller : 'viewerController',
		compile : function () {
			console.log('2');
		}
	};
}]);

viewer.controller('viewerController', ['$scope', 'app', function($scope, app) {
	console.log('viewer.viewerController');
	console.log($scope);
}]);

viewer.factory('viewFactory', [function () {
	return {
		aaa : function  () {
			console.log('aaa');
		}
	};
}]);












angular.module('main', [])
.controller('mainController', [function () {
	console.log('main.controller');
	// console.log(app);
}]);

var floor = angular.module('floor', []);

angular.module('api', []);

// angular.module('api.floor');


angular.module('api').factory('apiFactory', ['$http', function ($http) {
	
	console.log('app.factory');
	
    return {
    	get : function () {
    		$http.get('/temp/floor.json').success(function(response, status, headers, config){
				
				console.log(response);
				
		    	datas = response;
		    });
    	}
    };
}]);
 

floor.directive('appTitle1', ['api', function(api){
	return {
		restrict : 'A',
		templateUrl : '/pages/title.html'
	};
}]);

// angular.module('app').run(['security', function(security) {
  // // Get the current user when the application starts
  // // (in case they are still logged in from a previous session)
  // security.requestCurrentUser();
// }]);



// app.run(
	// ['api', function(api) {
		// // Get the current user when the application starts
		// // (in case they are still logged in from a previous session)
		// // security.requestCurrentUser();
	// }]
// );
