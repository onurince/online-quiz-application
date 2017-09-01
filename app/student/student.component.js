'use strict';

angular.
module('student').
component('student', {
  templateUrl: 'student/student.template.html',
  controller: StudentController
});

StudentController.$inject = ['QuizService'];

function StudentController(QuizService) {
  var self = this;

  self.quizzes = QuizService.getAvailable();
}