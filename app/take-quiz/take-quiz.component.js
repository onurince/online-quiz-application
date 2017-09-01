'use strict';

angular.module('takeQuiz').component('takeQuiz', {
  templateUrl: 'take-quiz/take-quiz.template.html',
  controller: TakeQuizController
});

TakeQuizController.$inject = ['QuizService', '$routeParams'];

function TakeQuizController(QuizService, $routeParams) {
  var self = this;

  self.quizId = $routeParams.quizId;
  self.quiz = QuizService.get(self.quizId);
  // self.isAvailable = self.quiz.isAvailable;
  self.score = false;


  self.checkboxCheckChanged = function checkboxCheckChanged(question) {
    var answers = question.givenAnswer;
    var hasSomeTrueAnswers = Object.values(answers).some(function (answer) {
      return answer === true;
    });
    question.isValidforSubmit = (hasSomeTrueAnswers);
  };

  self.submitQuiz = function submitQuiz() {
    var score = QuizService.submit(self.quiz);
    self.score = score;
  };

}