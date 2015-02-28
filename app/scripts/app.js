'use strict';

var frasqueApp = angular.module('frasqueApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngAnimate',
  'ui.utils'
]);

frasqueApp.config([ '$locationProvider','$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.baseHref = '/faq/';
  $routeProvider
    .when('/faq', {
      templateUrl: 'views/main.html',
      controller: 'FaqCtrl'
    })
    .when('/faq/:sectionId*/question/:questionId', {
      templateUrl : 'views/question.html',
      controller : 'QuestionCtrl'
    })
    .when('/faq/:sectionId*', {
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
      $http.get('data/faqData.json').success(function(data){
        callback(data);
      });
    }
  };
}]);
