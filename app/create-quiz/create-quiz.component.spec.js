'use strict';

describe('createQuiz', function () {

  beforeEach(function () {
    module('createQuiz');
    module('core.storage');
  });

  describe('CreateQuizController', function () {
    var ctrl;

    var defaultQuestions = {
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

    beforeEach(inject(function ($componentController) {
      ctrl = $componentController('createQuiz');
    }));

    it('should fetch default structure', function () {
      var defaultQuestion = [defaultQuestions];
      expect(ctrl.questions).toEqual(defaultQuestion);
    });

    it('should add new question to ctrl.questions', function() {
      ctrl.addQuestion();
      var defaultQuestion = [defaultQuestions];
      defaultQuestion.push(defaultQuestions);
      expect(ctrl.questions.length).toBe(2);
      expect(ctrl.questions).toEqual(defaultQuestion);
    });

    it('should be remove question from ctrl.questions', function () {
      ctrl.questions = [defaultQuestions];
      var questions = [defaultQuestions];
      questions.push(defaultQuestions);
      ctrl.addQuestion();
      expect(ctrl.questions.length).toBe(2);
      ctrl.removeQuestion(1);
      expect(ctrl.questions.length).toBe(1);
      expect(ctrl.questions).toEqual([defaultQuestions]);

    });
  });
});