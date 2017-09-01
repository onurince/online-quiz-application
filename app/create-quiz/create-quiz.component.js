'use strict';

angular.module('createQuiz').component('createQuiz', {
  templateUrl: 'create-quiz/create-quiz.template.html',
  controller: CreateQuizController
});

CreateQuizController.$inject = ['QuizService', '$window'];

function CreateQuizController(QuizService, $window) {
  var self = this;

  self.questions = [getEmptyQuestion()];

  self.addQuestion = function addQuestion() {
    self.questions.push(getEmptyQuestion());
  };

  self.checkboxCheckChanged = function checkboxCheckChanged(question) {
    var answers = question.answers;
    var hasSomeTrueAnswers = answers.some(function (answer) {
      return answer.correct === true;
    });
    question.isValid = (hasSomeTrueAnswers);
  };

  self.removeQuestion = function removeQuestion(index) {
    self.questions.splice(index, 1);
  };

  self.saveQuiz = function saveQuiz() {
    var data = {
      name: self.quizName,
      questions: self.questions
    };
    QuizService.save(data);
    $window.location.href = '#/teacher';
  };

  function getEmptyQuestion() {
    return {
      text: '',
      answers: [{
        text: '',
        correct: false,
      }, {
        text: '',
        correct: false,
      }, {
        text: '',
        correct: false,
      }, {
        text: '',
        correct: false,
      }],
      isValid: false
    };
  }
}