'use strict';

angular
    .module('webQuizApp')
    .config(configure)
    .run(run);

configure.$inject = ['$locationProvider', '$routeProvider'];

function configure($locationProvider, $routeProvider) {

  $locationProvider.hashPrefix('!');

  $routeProvider
      .when('/teacher', {
        template: '<teacher></teacher>'
      })
      .when('/student', {
        template: '<student></student>'
      })
      .when('/teacher/create-quiz', {
        template: '<create-quiz></create-quiz>'
      })
      .when('/student/take-quiz/:quizId', {
        template: '<take-quiz></take-quiz>'
      })
      .otherwise('/teacher');
}

function run($rootScope) {
  $rootScope.$on("$routeChangeSuccess", routeChangeHandler);

  function routeChangeHandler(angularEvent, currentRoute, previousState) {
    var url = currentRoute.$$route.originalPath.split('/')[1];
    console.log('url', url);
    angular.element(document.querySelector('#menu_student')).removeClass('active');
    angular.element(document.querySelector('#menu_teacher')).removeClass('active');
    angular.element(document.querySelector('#menu_' + url)).addClass('active');
  }
}