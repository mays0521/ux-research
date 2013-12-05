'use strict';

/* Filters */

angular.module('myApp.filters', ['ngRoute'])
   .filter('interpolate', ['version', function(version) {
      return function(text) {
         return String(text).replace(/\%VERSION\%/mg, version);
      }
   }])

   .filter('reverse', function() {
      return function(items) {
         return items.slice().reverse();
      };
   })

    .filter('toArray', function () {
        return function (obj) {
            if (!(obj instanceof Object)) {
                return obj;
            }
            return Object.keys(obj).map(function (key) {
                return Object.defineProperty(obj[key], '$key', {__proto__: null, value: key});
            });
        }
    });
