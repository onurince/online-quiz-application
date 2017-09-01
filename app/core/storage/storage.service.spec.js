'use strict';

describe('StorageService', function () {

  var StorageService;
  var storage;

  beforeEach(module('core.storage'));

  beforeEach(inject(function (_StorageService_) {
    StorageService = _StorageService_;
    storage = window.localStorage;
  }));

  afterEach(function() {
    storage.removeItem('foo');
  });

  it('should set string in localStorage key:`foo`, value:`bar`', function () {
    StorageService.set('foo', 'bar');
    var foo = storage.getItem('foo');
    expect(foo).toEqual('"bar"')
  });

  it('should set object in localStorage key:`foo`, value:`{bar:baz}`', function () {
    StorageService.set('foo', {bar:'baz'});
    var foo = storage.getItem('foo');
    expect(foo).toEqual('{"bar":"baz"}');
  });

  it('should get string from localStorage with key `foo`', function () {
    storage.setItem('foo', JSON.stringify('bar'));
    var foo = StorageService.get('foo');
    expect(foo).toEqual('bar');
  });

  it('should get object from localStorage with key `foo`', function() {
    storage.setItem('foo', JSON.stringify({bar:'baz'}));
    var foo = StorageService.get('foo');
    expect(foo).toEqual({bar:'baz'});
  });

  it('should get empty object from localStorage with invalid JSON string', function() {
    storage.setItem('foo', '{"bar":"baz}');
    var foo = StorageService.get('foo');
    expect(foo).toEqual({});
  });

});