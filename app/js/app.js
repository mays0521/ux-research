'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp',
      ['ngRoute', 'myApp.config', 'myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers', 'firebase']
   )

    // configure views; note the authRequired parameter for authenticated pages
    .config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/', {
            templateUrl: 'app/partials/main.html',
            controller: 'mainCtrl'
        });

        /*
        $routeProvider.when('/login', {
            templateUrl: 'app/partials/login.html',
            controller: 'loginCtrl'
        });
        */

        $routeProvider.when('/result', {
            // authRequired: true,
            templateUrl: 'app/partials/result.html',
            controller: 'resultCtrl'
        });

        $routeProvider.otherwise({redirectTo: '/'});

    }])

   // double-check that the app has been configured
   /*.run(['FBURL', function(FBURL) {
      if( FBURL === 'https://ux-survey.firebaseio.com' ) {
         angular.element(document.body).html('<h1>Please configure app/js/config.js before running!</h1>');
      }
   }])*/

   // establish authentication
    /*
   .run(['angularFireAuth', 'FBURL', '$rootScope', function(angularFireAuth, FBURL, $rootScope) {
      angularFireAuth.initialize(FBURL, {scope: $rootScope, name: "auth", path: '/login'});
      $rootScope.FBURL = FBURL;
   }]);
        */