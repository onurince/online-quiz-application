'use strict';

describe('teacher', function () {

  beforeEach(function () {
    module('teacher');
    module('core.storage');
  });

  describe('TeacherController', function () {
    var ctrl;
    var QuizServiceMock;
    var allQuizzesResponse = {
      '10fe31d4-f467-41ba-968b-b8b9ca62afdd':
          {
            name: 'new quiz 1',
            questions: [{text: 'question 1', answers: [Object], isMultiple: true},
              {text: 'question 2', answers: [Object], isMultiple: false}],
            creationDate: '2017-07-29T21:44:27.433Z',
            id: '10fe31d4-f467-41ba-968b-b8b9ca62afdd',
            isAvailable: false
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
    var makeAvailableResponse = {
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

    var allSubmittedResponse = [{
      id: "10fe31d4-f467-41ba-968b-b8b9ca62afdd",
      name: "new quiz 1",
      score: 2,
      submissionDate: "2017-07-30T07:15:44.438Z"
    }];


    beforeEach(inject(function ($componentController) {
      QuizServiceMock = {
        allQuizzesResponse: function () {
          return allQuizzesResponse;
        },
        makeAvailable: function (id) {
          var response = angular.copy(allQuizzesResponse);
          response[id].isAvailable = true;
          return response;
        },
        getSubmitted: function () {
          return allSubmittedResponse;
        }
      };
      ctrl = $componentController('teacher');

    }));

    it('should fetch all quizzes', function () {
      ctrl.quizzes = QuizServiceMock.allQuizzesResponse();
      expect(ctrl.quizzes).toEqual(allQuizzesResponse);
    });

    it('should be `2` count of all quizzes', function () {
      ctrl.quizzes = QuizServiceMock.allQuizzesResponse();
      var keys = Object.keys(ctrl.quizzes);
      expect(keys.length).toEqual(2);
    });

    it('should make available quiz with id `10fe31d4-f467-41ba-968b-b8b9ca62afdd`', function () {
      ctrl.quizzes = QuizServiceMock.makeAvailable('10fe31d4-f467-41ba-968b-b8b9ca62afdd');
      expect(ctrl.quizzes).toEqual(makeAvailableResponse);
    });

    it('should fetch all submitted quizzes', function() {
      ctrl.submittedQuizzes = QuizServiceMock.getSubmitted();
      expect(ctrl.submittedQuizzes).toEqual(allSubmittedResponse);
    });

    it('should be `1` count of all submitted quizzes', function () {
      ctrl.submittedQuizzes = QuizServiceMock.getSubmitted();
      expect(ctrl.submittedQuizzes.length).toBe(1);
    });

  });

});