'use strict';

angular.module('core.storage')
    .factory('StorageService', StorageService);

StorageService.$inject = ['$window', '$log'];

function StorageService($window, $log) {
  return {
    set: set,
    get: get
  }

  function set(key, value) {
    $window.localStorage.setItem(key, angular.toJson(value));
  }

  function get(key) {
    var data = $window.localStorage.getItem(key);
    try {
      data = angular.fromJson(data);
    } catch (ex) {
      $log.error('Error while parsing json from localStorage', ex);
      data = {};
    } finally {
      return data;
    }
  }
}