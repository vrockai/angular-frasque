'use strict';

var frasqueApp = angular.module('frasqueApp');

frasqueApp.controller('MainCtrl', ['$scope', '$routeParams', 'FaqData', function($scope, $routeParams, FaqData) {

    FaqData.get(function(response){
      $scope.faq = response;
    });




    if(!$scope.$routeParams){
      $scope.$routeParams = $routeParams;
    }

    $scope.$watch('$routeParams', function(){ console.log($scope.$routeParams); });

    $scope.urlPrefix = '';
    if ($scope.$routeParams.topicId){
      $scope.urlPrefix = $scope.urlPrefix + $scope.$routeParams.topicId + '/';
    }
    if ($scope.$routeParams.sectionId){
      $scope.urlPrefix = $scope.urlPrefix + $scope.$routeParams.sectionId + '/';
    }

  }]).controller('FaqCtrl', ['$scope', '$routeParams', 'FaqData', function($scope, $routeParams, FaqData) {

    $scope.questions = [];
    $scope.$routeParams = $routeParams;
/*
    $scope.urlPrefix = '';
    if ($routeParams.topicId){
      $scope.urlPrefix = $scope.urlPrefix + $routeParams.topicId + '/';
    }
    if ($routeParams.sectionId){
      $scope.urlPrefix = $scope.urlPrefix + $routeParams.sectionId + '/';
    }
*/
    var getChildren = function(node){
      if (node instanceof Array ) {
        $scope.questions.push(node);
      } else {
        for (var i in node.content){
          getChildren(node.content[i]);
        }
      }
    };

    // Get the JSON data
    FaqData.get(function(response){

      $scope.faq = response;

      for (var i in $scope.faq){
        getChildren($scope.faq[i]);
      }

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
