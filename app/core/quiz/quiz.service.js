'use strict';

angular.module('core.quiz')
    .factory('QuizService', QuizService);

QuizService.$inject = ['StorageService', 'Uuid'];

function QuizService(StorageService, Uuid) {

  var ALL_QUIZZES_KEY = 'all_quizzes';
  var SUBMITTED_QUIZZES = 'submitted_quizzes';

  return {
    save: save,
    get: get,
    getAll: getAll,
    makeAvailable: makeAvailable,
    getAvailable: getAvailable,
    calculateScore: calculateScore,
    submit: submit,
    getSubmitted: getSubmitted,
    compareTwoArrays: compareTwoArrays
  };

  function save(quizData) {
    var quizId = Uuid.generate();
    var allQuizzes = getAll() || {};

    quizData.creationDate = new Date();
    quizData.id = quizId;
    quizData.isAvailable = false;

    var questions = quizData.questions;

    questions.forEach(function (question) {
      var correctAnswers = question.answers.reduce(function (sum, answer) {
        if (answer.correct === true) {
          sum++;
        }
        return sum;
      }, 0);
      question['isMultiple'] = (correctAnswers > 1);
    });

    allQuizzes[quizId] = quizData;
    StorageService.set(ALL_QUIZZES_KEY, allQuizzes);

    return quizData;
  }

  function get(key) {
    var quizData = getAll();
    return quizData[key];
  }

  function getAll() {
    return StorageService.get(ALL_QUIZZES_KEY);
  }

  function makeAvailable(id) {
    var quizzesData = getAll();
    quizzesData[id].isAvailable = true;
    StorageService.set(ALL_QUIZZES_KEY, quizzesData);
  }

  function getAvailable() {
    var quizzesData = getAll();
    var quizzesArray = Object.values(quizzesData);
    return quizzesArray.filter(function (quiz) {
      return quiz.isAvailable === true;
    });
  }

  function getSubmitted() {
    return StorageService.get(SUBMITTED_QUIZZES) || [];
  }

  function submit(quizData) {
    var submittedQuizzes = getSubmitted() || [];
    var score = calculateScore(quizData.questions);

    var submittedQuiz = {
      id: quizData.id,
      name: quizData.name,
      score: score,
      submissionDate: new Date()
    };
    submittedQuizzes.push(submittedQuiz);

    StorageService.set(SUBMITTED_QUIZZES, submittedQuizzes);
    return score;
  }

  function calculateScore(questions) {
    var total = 0;
    questions.forEach(function (question) {
      var givenAnswer = [];
      if (angular.isObject(question.givenAnswer)) {
        for (var key in question.givenAnswer) {
          if (question.givenAnswer[key] === true) {
            givenAnswer.push(key);
          }
        }
      } else {
        givenAnswer.push(question.givenAnswer);
      }

      var correctAnswer = question.answers.filter(function (question) {
        return question.correct === true;
      }).map(function (question) {
        return question.text;
      });

      if (compareTwoArrays(correctAnswer, givenAnswer)) {
        total += 3;
      } else {
        total -= 1;
      }
    });

    return total;
  }
  // this function is exposed for unit test. These kind of function should be in helper functions as separate files
  function compareTwoArrays(array1, array2) {

    if (array1.length !== array2.length) {
      return false;
    }

    array1.sort();
    array2.sort();

    return array1.every(function (element, index) {
      return element === array2[index];
    });

  }
}

