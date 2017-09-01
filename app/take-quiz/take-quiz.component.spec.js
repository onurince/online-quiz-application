'use strict';

describe('takeQuiz', function () {

  var allQuizzesResponse = {
    '10fe31d4-f467-41ba-968b-b8b9ca62afdd':
        {
          name: 'new quiz 1',
          questions: [{text: 'question 1', answers: [Object], isMultiple: true},
            {text: 'question 2', answers: [Object], isMultiple: false}],
          creationDate: '2017-07-29T21:44:27.433Z',
          id: '10fe31d4-f467-41ba-968b-b8b9ca62afdd',
          isAvailable: true
        },
    '7542a6ba-0ade-40d4-b4ea-ff9cd9ab8dcf':
        {
          name: 'asdas',
          questions: [{text: 'question 1', answers: [Object], isMultiple: true},
            {text: 'question 2', answers: [Object], isMultiple: false}],
          creationDate: '2017-07-30T08:54:04.696Z',
          id: '7542a6ba-0ade-40d4-b4ea-ff9cd9ab8dcf',
          isAvailable: false
        }
  };

  beforeEach(function () {
    module('takeQuiz');
    module(function($provide){
      $provide.factory('QuizService', function() {
        return {
          get: function (id) {
            var response = angular.copy(allQuizzesResponse);
            return response[id];
          },
          submit: function(questions) {
            return 5;
          }
        }
      });
    });
    module('ngRoute')
  });

  describe('TakeQuizController', function () {
    var ctrl;
    var QuizService;
    var quizId = '10fe31d4-f467-41ba-968b-b8b9ca62afdd';

    var quizResponse = {
      name: 'new quiz 1',
      questions: [{text: 'question 1', answers: [Object], isMultiple: true},
        {text: 'question 2', answers: [Object], isMultiple: false}],
      creationDate: '2017-07-29T21:44:27.433Z',
      id: '10fe31d4-f467-41ba-968b-b8b9ca62afdd',
      isAvailable: true

    };

    beforeEach(inject(function ($componentController, $routeParams, _QuizService_) {
      QuizService = _QuizService_;
      $routeParams.quizId = quizId;

      ctrl = $componentController('takeQuiz');

    }));

    it('should be equal id `10fe31d4-f467-41ba-968b-b8b9ca62afdd`', function () {
      expect(ctrl.quizId).toEqual(quizId);
    });

    it('should be equal false the quiz score`', function () {
      expect(ctrl.score).toBe(false);
    });

    it('should fetch quiz with id `10fe31d4-f467-41ba-968b-b8b9ca62afdd` ', function () {
      ctrl.quiz = QuizService.get(quizId);
      expect(ctrl.quiz).toEqual(quizResponse);
    });

    it('should submit quiz and returns 5', function () {
      ctrl.score = QuizService.submit({'quizData':'data'});
      expect(ctrl.score).toEqual(5);
    });

  });

});