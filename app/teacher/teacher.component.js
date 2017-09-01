'use strict';

angular.
  module('teacher').
  component('teacher', {
    templateUrl: 'teacher/teacher.template.html',
    controller: TeacherController
});

TeacherController.$inject = ['QuizService'];

function TeacherController(QuizService) {
  var self = this;

  getQuizzes();

  self.submittedQuizzes = QuizService.getSubmitted();
  self.makeAvailable = function (id) {
    QuizService.makeAvailable(id);
    getQuizzes();
  };

  function getQuizzes() {
    self.quizzes = QuizService.getAll();
  }

}