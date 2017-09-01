'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('Web Quiz App', function() {

  it('should redirect `index.html` to `index.html#!/teacher', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toBe("/teacher");
  });

});
