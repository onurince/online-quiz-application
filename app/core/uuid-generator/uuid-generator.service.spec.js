'use strict';

describe('Uuid', function () {

  var Uuid;

  beforeEach(module('core.uuidGenerator'));

  beforeEach(inject(function (_Uuid_) {
    Uuid = _Uuid_;
  }));

  it('should uuid length is `36`', function () {
    var uuid = Uuid.generate();
    expect(uuid.length).toBe(36);
  });

  it('should uuid has `5` parts', function() {
    var uuid = Uuid.generate();
    var parts = uuid.split('-');
    expect(parts.length).toBe(5);
  });

  it('should uuid 3rd part starts with `4`', function() {
    var uuid = Uuid.generate();
    var thirdPartFirstLetter = uuid.split('-')[2].charAt(0);
    expect(thirdPartFirstLetter).toBe('4');
  });
});