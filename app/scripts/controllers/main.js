'use strict';

var frasqueApp = angular.module('frasqueApp');

frasqueApp.controller('MainCtrl', ['$scope', '$route', 'FaqData', function($scope, $route, FaqData) {

    FaqData.get(function(response){
      $scope.faq = response;
    });

  }]).controller('FaqCtrl', ['$scope', '$routeParams', 'FaqData', function($scope, $routeParams, FaqData) {

    $scope.questions = [];

    var getChildren = function(node){
      if (node instanceof Array ) {
        $scope.questions.push(node);
      } else {
        for (var i in node.content){
          getChildren(node.content[i]);
        }
      }
    };

    // Generate breadcrumbs + url prefix
    $scope.urlPrefix = '';
    if ($routeParams.topicId){
      $scope.urlPrefix = $scope.urlPrefix + $routeParams.topicId + '/';
    }
    if ($routeParams.sectionId){
      $scope.urlPrefix = $scope.urlPrefix + $routeParams.sectionId + '/';
    }

    // Get the JSON data
    FaqData.get(function(response){
      console.log('getting data');

      $scope.faq = response;

      for (var i in $scope.faq){
        getChildren($scope.faq[i]);
      }
      console.log($scope.questions);

      if ($routeParams.topicId) {
        var topicId = $routeParams.topicId;
        $scope.faq = response[topicId].content;

        if ($routeParams.sectionId) {
          var sectionId = $routeParams.sectionId;
          $scope.faq = $scope.faq[sectionId].content;
        }

        if ($routeParams.questionId) {
          $scope.questionId = $routeParams.questionId;
        }
      }
    });

    // Show Q&A
    $scope.$watch('faq', function(){
      $scope.isContent = ($routeParams.sectionId && $scope.faq);
    });

  }]);
