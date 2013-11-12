'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngRoute'])

    .controller('gameCtrl', ['$scope', '$rootScope', 'Firebase', 'angularFire', '$location', function($scope, $rootScope, Firebase, angularFire, $location) {

        $scope.initGame = function () {
            window.addEventListener('load', Game.start);
        }

        $scope.$watch('score', function () {
            console.log($scope.score);
            if ($scope.score > 0) {
                $('#ranking').modal('show');
            }
        });

        var ref = new Firebase('https://ux-research.firebaseio.com/ranking');
        angularFire(ref.limit(15), $rootScope, "ranking");
        $scope.name = 'Guest' + Math.floor(Math.random()*101);
        $scope.addScore = function() {
            $rootScope.ranking[ref.push().name()] = {name: $scope.name, score: $scope.score, time: $scope.time};
            $('#ranking').modal('hide');
            $location.path('/survey');
        };

        $scope.initGame();
    }])

    .controller('surveyCtrl', ['$scope', '$rootScope', 'FBURL', 'Firebase', 'angularFireCollection', 'angularFire', function($scope, $rootScope, FBURL, Firebase, angularFireCollection, angularFire) {

        // default sorting
        $scope.predicate = '-score';

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
            $('#survey').modal('show');
        };

        // fetch score for ranking
        var ref = new Firebase('https://ux-research.firebaseio.com/ranking');
        angularFire(ref.limit(15), $rootScope, "ranking");

        var surveyRef = new Firebase('https://ux-research.firebaseio.com/survey');
        angularFire(surveyRef, $rootScope, "results");

        // add new results to the list
        $scope.addSurvey = function() {
            if( $scope.rating && $scope.difficulty && $scope.playagain && $scope.recommend && $scope.gameType ) {
                $rootScope.results[surveyRef.push().name()] = {rating: $scope.rating, difficulty: $scope.difficulty, playagain: $scope.playagain, recommend: $scope.recommend, gameType: $scope.gameType, comment: $scope.comment};
                $scope.successInfo = true;
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
                $location.path('/result')
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