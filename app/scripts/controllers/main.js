'use strict';

var frasqueApp = angular.module('frasqueApp');

frasqueApp.controller('MainCtrl', ['$scope', '$rootScope', 'FaqData', function($scope, $rootScope, FaqData) {

    console.debug('MainCtrl');

    $scope.questions = [];

    // Recursive traversion of JSON to gather all questions for search filtering.
    FaqData.get(function(response){

      var getChildren = function(node){
        for (var i in node){
          if (node[i].hasOwnProperty('questions') ) {
            for (var q in node[i].questions){
              $scope.questions.push(node[i].questions[q]);
            }
          }
          getChildren(node[i].content);
        }
      };

      $scope.faq = response;

      for (var i in $scope.faq){
        getChildren($scope.faq[i]);
      }
    });

  }]).controller('FaqCtrl', ['$scope', '$rootScope', '$route', '$routeParams', 'FaqData', function($scope, $rootScope, $route, $routeParams, FaqData) {

    console.debug('FaqCtrl');

    var routeParams = [];

    $scope.routeParams = '';

    if ($routeParams.questionId){
      $scope.questionId = $routeParams.questionId;
    }

    if($routeParams.sectionId){
      var params = $routeParams.sectionId;
      if ($routeParams.sectionId.indexOf('/', $routeParams.sectionId.length - 1) !== -1){
        params = $routeParams.sectionId.substring(0, $routeParams.sectionId.length - 1);
      }

      $scope.routeParams = params;
      routeParams = params.split('/');
    }

    // Route parameters are stored in the $rootScope, so they are visible in other Controllers. Used in breadcrumbs.
    $rootScope.routeParams = routeParams;

    // Get the JSON data of current sub-tree
    FaqData.get(function(response){
      $scope.faq = response;

      for (var j =0; j< routeParams.length; j++){
        if(routeParams[j] !== ''){
          $scope.faq = $scope.faq.content[routeParams[j]];
        }
      }
    });

  }]).controller('QuestionCtrl', ['$scope', '$rootScope', '$route', '$routeParams', 'FaqData', function($scope, $rootScope, $route, $routeParams, FaqData) {

    console.debug('QuestionCtrl');

    $scope.questionId = $routeParams.questionId;

    // Get the JSON data of current sub-tree and current question
    FaqData.get(function(response){

      var routeParams = $routeParams.sectionId.split('/');
      $scope.faq = response;
      for (var j =0; j< routeParams.length; j++){
        if(routeParams[j] !== ''){
          $scope.faq = $scope.faq.content[routeParams[j]];
        }
      }
    });

  }]);
