'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngRoute'])

    .controller('mainCtrl', ['$scope', '$rootScope', 'FBURL', 'Firebase', 'angularFireCollection', 'angularFire', function($scope, $rootScope, FBURL, Firebase, angularFireCollection, angularFire) {

        // main section controller
        $scope.initGame = function () {
            Game.start();
        };

        $scope.$watch('score', function () {
            if ($scope.score > 0) {
                angular.element('#ranking').modal('show');
            }
        });

        var ref = new Firebase('https://ux-research.firebaseio.com/ranking');
        angularFire(ref.limit(10), $rootScope, "ranking");
        $scope.name = 'Guest' + Math.floor(Math.random()*101);
        $scope.addScore = function() {
            $rootScope.ranking[ref.push().name()] = {name: $scope.name, score: $scope.score, time: $scope.time, model: $scope.model};
            angular.element('#ranking').modal('hide');
        };

        $scope.initGame();

        // survey section controller
        // default placeholders
        $scope.rating = 5;
        $scope.difficulty = 'Medium';
        $scope.playagain = 'Yes';
        $scope.recommend = 'Yes';
        $scope.gameType = 'Puzzle';
        $scope.comment = '';

        // hide success information/alert
        $scope.successInfo = false;

        // star rating question - update rating score
        $scope.updateRating = function(rating) {
            $scope.rating = rating;
        };

        // open modal
        $scope.takeSurvey = function () {
            angular.element('#survey').modal('show');
        };

        // fetch score for ranking
        var ref = new Firebase('https://ux-research.firebaseio.com/ranking');
        angularFire(ref.limit(10), $rootScope, "ranking");

        var surveyRef = new Firebase('https://ux-research.firebaseio.com/survey');
        angularFire(surveyRef, $rootScope, "results");

        // add new results to the list
        $scope.addSurvey = function() {
            if( $scope.name && $scope.rating && $scope.difficulty && $scope.playagain && $scope.recommend && $scope.gameType ) {
                $rootScope.results[surveyRef.push().name()] = {name: $scope.name, rating: $scope.rating, difficulty: $scope.difficulty, playagain: $scope.playagain, recommend: $scope.recommend, gameType: $scope.gameType, comment: $scope.comment};
                $scope.successInfo = true;
                angular.element('#survey').modal('hide');
            } else {
                alert('You missed something.');
            }
        };

    }])

    .controller('loginCtrl', ['$scope', 'loginService', '$location', function($scope, loginService, $location) {
        $scope.email = 'cdeng@wpi.edu';
        $scope.pass = 'testaccount';

        $scope.login = function(callback) {
        $scope.err = null;
        loginService.login($scope.email, $scope.pass, '/login', function(err, user) {
            $scope.err = err||null;
            typeof(callback) === 'function' && callback(err, user);
            if (!$scope.err) {
                $location.path('/result');
            }
            });
        };

    }])

    .controller('resultCtrl', ['$scope', '$rootScope', 'loginService', 'angularFire', 'FBURL', '$timeout', function($scope, $rootScope, loginService, angularFire, FBURL, $timeout) {

        // angularFire(FBURL+'/users/'+$scope.auth.id, $scope, 'user', {});

        var surveyRef = new Firebase('https://ux-research.firebaseio.com/survey');
        angularFire(surveyRef, $rootScope, "results");

        $rootScope.logout = function() {
            loginService.logout('/survey');
        };

    }]);