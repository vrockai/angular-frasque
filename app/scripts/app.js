'use strict';

var frasqueApp = angular.module('frasqueApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
]);

frasqueApp.config([ '$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/faq', {
      templateUrl: 'views/main.html',
      controller: 'FaqCtrl'
    })
    .when('/faq/:topicId', {
      templateUrl : 'views/main.html',
      controller : 'FaqCtrl'
    })
    .when('/faq/:topicId/:sectionId', {
      templateUrl : 'views/main.html',
      controller : 'FaqCtrl'
    })
    .when('/faq/:topicId/:sectionId/:questionId', {
      templateUrl : 'views/main.html',
      controller : 'FaqCtrl'
    })
    .otherwise({
      redirectTo: '/faq'
    });
}]);

frasqueApp.factory('FaqData', ['$http', function($http){
  return {
    get: function(callback){
      $http.get('../scripts/faqData.json').success(function(data){
        callback(data);
      });
    }
  };
}]);