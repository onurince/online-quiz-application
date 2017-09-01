'use strict';

describe('QuizService', function () {

  var QuizService;
  var storage = {};
  var lastQuizId;
  var lastQuizData;

  beforeEach(function () {
    module('core.quiz');
    module(function($provide){
      $provide.factory('StorageService', function() {
        return {
          get: function(key) {
            return storage[key];
          },
          set: function(key, value) {
            storage[key] = value;
          }
        }
      });
    });
  });

  beforeEach(inject(function (_QuizService_) {
    QuizService = _QuizService_;
  }));

  beforeEach(function() {
    var quizData = saveQuiz();
    lastQuizId = quizData.id;
    lastQuizData = quizData;
  })

  afterEach(function() {
    storage = {}
  });

  it('should save quiz', function () {
    var quizData = saveQuiz();
    expect(quizData.id.length).toBe(36);
    expect(quizData.isAvailable).toBe(false);
  });

  it('should get all quizzes', function() {
    var lengthBefore = Object.keys(QuizService.getAll()).length;
    expect(lengthBefore).toBe(1);
    saveQuiz();
    var lengthAfter = Object.keys(QuizService.getAll()).length;
    expect(lengthAfter).toBe(2);
  });

  it('should get quiz by id', function() {
    var quiz = QuizService.get(lastQuizId);
    expect(quiz.id).toEqual(lastQuizId);
    expect(quiz.name).toEqual('testQuiz');
  });

  it('should make available quiz by id', function() {
    var beforeAvailable = QuizService.get(lastQuizId);
    expect(beforeAvailable.isAvailable).toBe(false);
    QuizService.makeAvailable(lastQuizId);
    var afterAvailable = QuizService.get(lastQuizId);
    expect(afterAvailable.isAvailable).toBe(true);
  });

  it('should get available quizzes', function() {
    expect(QuizService.getAvailable().length).toBe(0);
    expect(QuizService.getAvailable()).toEqual([]);
    QuizService.makeAvailable(lastQuizId);
    expect(QuizService.getAvailable().length).toBe(1);
  });

  it('should get submitted quiz', function() {
    expect(QuizService.getSubmitted().length).toBe(0);
    submitQuiz();
    expect(QuizService.getSubmitted().length).toBe(1);
  });

  it('should submit quiz', function() {
    expect(QuizService.getSubmitted().length).toBe(0);
    var score = submitQuiz();
    expect(QuizService.getSubmitted().length).toBe(1);
    expect(score).toBe(2);
  });

  function submitQuiz() {
    var defaultQuizData =  {
      id: 'testQuizId',
      name: 'testQuiz',
      questions: [
        {
          text: 'test q1',
          answers: [{
            text: 'test q1 answer 1',
            correct: true
          }, {
            text: 'test q1 answer 2',
            correct: false
          }, {
            text: 'test q1 answer 3',
            correct: false
          }, {
            text: 'test q1 answer 4',
            correct: false
          }],
          isMultiple: false,
          givenAnswer: 'test q1 answer 1'
        },
        {
          text: 'test q2',
          answers: [{
            text: 'test q2 answer 1',
            correct: false
          }, {
            text: 'test q2 answer 2',
            correct: true
          }, {
            text: 'test q2 answer 3',
            correct: true
          }, {
            text: 'test q2 answer 4',
            correct: false
          }],
          isMultiple: true,
          givenAnswer: {
            'test q2 answer 1': true,
            'test q2 answer 4': true,
          }
        }
      ]
    };
    var score = QuizService.submit(defaultQuizData);
    return score;
  }

  function saveQuiz() {
    var defaultQuizData =  {
      name: 'testQuiz',
      questions: [
        {
          text: 'test q1',
          answers: [{
            text: 'test q1 answer 1',
            correct: true
          }, {
            text: 'test q1 answer 2',
            correct: false
          }, {
            text: 'test q1 answer 3',
            correct: false
          }, {
            text: 'test q1 answer 4',
            correct: false
          }]
        },
        {
          text: 'test q2',
          answers: [{
            text: 'test q2 answer 1',
            correct: false
          }, {
            text: 'test q2 answer 2',
            correct: true
          }, {
            text: 'test q2 answer 3',
            correct: true
          }, {
            text: 'test q2 answer 4',
            correct: false
          }]

        }
      ]
    };
    var savedQuizData = QuizService.save(defaultQuizData);
    return savedQuizData;
  }

  it('should be `2` as a result of calculating quiz score', function () {
    var questions = [
      {
        text: 'test q1',
        answers: [{
          text: 'test q1 answer 1',
          correct: true
        }, {
          text: 'test q1 answer 2',
          correct: false
        }, {
          text: 'test q1 answer 3',
          correct: false
        }, {
          text: 'test q1 answer 4',
          correct: false
        }],
        isMultiple: false,
        givenAnswer: 'test q1 answer 1'
      },
      {
        text: 'test q2',
        answers: [{
          text: 'test q2 answer 1',
          correct: false
        }, {
          text: 'test q2 answer 2',
          correct: true
        }, {
          text: 'test q2 answer 3',
          correct: true
        }, {
          text: 'test q2 answer 4',
          correct: false
        }],
        isMultiple: true,
        givenAnswer: {
          'test q2 answer 1': true,
          'test q2 answer 4': true,
        }
      }
    ];

    var score = QuizService.calculateScore(questions);
    expect(score).toBe(2);
  });

  it('should be `-2` as a result of calculating quiz score', function () {
    var questions = [
      {
        text: 'test q1',
        answers: [{
          text: 'test q1 answer 1',
          correct: true
        }, {
          text: 'test q1 answer 2',
          correct: false
        }, {
          text: 'test q1 answer 3',
          correct: false
        }, {
          text: 'test q1 answer 4',
          correct: false
        }],
        isMultiple: false,
        givenAnswer: 'test q1 answer 2'
      },
      {
        text: 'test q2',
        answers: [{
          text: 'test q2 answer 1',
          correct: false
        }, {
          text: 'test q2 answer 2',
          correct: true
        }, {
          text: 'test q2 answer 3',
          correct: true
        }, {
          text: 'test q2 answer 4',
          correct: false
        }],
        isMultiple: true,
        givenAnswer: {
          'test q2 answer 1': true,
          'test q2 answer 4': true,
        }
      }
    ];

    var score = QuizService.calculateScore(questions);
    expect(score).toBe(-2);
  });

  it('should be `6` as a result of calculating quiz score', function () {
    var questions = [
      {
        text: 'test q1',
        answers: [{
          text: 'test q1 answer 1',
          correct: true
        }, {
          text: 'test q1 answer 2',
          correct: false
        }, {
          text: 'test q1 answer 3',
          correct: false
        }, {
          text: 'test q1 answer 4',
          correct: false
        }],
        isMultiple: false,
        givenAnswer: 'test q1 answer 1'
      },
      {
        text: 'test q2',
        answers: [{
          text: 'test q2 answer 1',
          correct: false
        }, {
          text: 'test q2 answer 2',
          correct: true
        }, {
          text: 'test q2 answer 3',
          correct: true
        }, {
          text: 'test q2 answer 4',
          correct: false
        }],
        isMultiple: true,
        givenAnswer: {
          'test q2 answer 2': true,
          'test q2 answer 3': true,
        }
      }
    ];

    var score = QuizService.calculateScore(questions);
    expect(score).toBe(6);
  });

  it('should not be `6` as a result of calculating quiz score', function () {
    var questions = [
      {
        text: 'test q1',
        answers: [{
          text: 'test q1 answer 1',
          correct: true
        }, {
          text: 'test q1 answer 2',
          correct: false
        }, {
          text: 'test q1 answer 3',
          correct: false
        }, {
          text: 'test q1 answer 4',
          correct: false
        }],
        isMultiple: false,
        givenAnswer: 'test q1 answer 2'
      },
      {
        text: 'test q2',
        answers: [{
          text: 'test q2 answer 1',
          correct: false
        }, {
          text: 'test q2 answer 2',
          correct: true
        }, {
          text: 'test q2 answer 3',
          correct: true
        }, {
          text: 'test q2 answer 4',
          correct: false
        }],
        isMultiple: true,
        givenAnswer: {
          'test q2 answer 2': true,
          'test q2 answer 3': true,
        }
      }
    ];

    var score = QuizService.calculateScore(questions);
    expect(score).not.toBe(6);
  });

  it('should be `true` comparing two array', function () {
    var array1 = [1, 2, 3];
    var array2 = [1, 2, 3];

    var isTrue = QuizService.compareTwoArrays(array1, array2);
    expect(isTrue).toBe(true);
  });

  it('should be `false` comparing two array with different sizes', function () {
    var array1 = [1, 2, 3];
    var array2 = [1, 2, 3, 4];

    var isTrue = QuizService.compareTwoArrays(array1, array2);
    expect(isTrue).toBe(false);
  });

  it('should be `false` comparing two array with the same size', function () {
    var array1 = [1, 2, 3];
    var array2 = [1, 2, 4];

    var isTrue = QuizService.compareTwoArrays(array1, array2);
    expect(isTrue).toBe(false);
  });

  it('should be `true` comparing two array with the different order', function () {
    var array1 = [1, 2, 3];
    var array2 = [3, 1, 2];

    var isTrue = QuizService.compareTwoArrays(array1, array2);
    expect(isTrue).toBe(true);
  });

});
