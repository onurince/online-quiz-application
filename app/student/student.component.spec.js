'use strict';

describe('student', function () {

  var response = [{
    creationDate: "2017-07-29T21:44:27.433Z",
    id: "10fe31d4-f467-41ba-968b-b8b9ca62afdd",
    isAvailable: true,
    name: "new quiz 1"
  }];

  beforeEach(function () {
    module('student');
    module(function($provide){
      $provide.factory('QuizService', function() {
        return {
          getAvailable: function() {
            return response;
          }
        }
      });
    });
  });

  describe('StudentController', function () {
    var ctrl;
    var QuizService;


    beforeEach(inject(function ($componentController, _QuizService_) {
      ctrl = $componentController('student');
      QuizService = _QuizService_
    }));

    it('should fetch available quizzes', function() {
      expect(ctrl.quizzes.length).toBe(1);
      expect(ctrl.quizzes).toEqual(response);
    });

    it('should be 1 count of available quizzes', function() {
      expect(ctrl.quizzes.length).toBe(1);
    });

  })

});