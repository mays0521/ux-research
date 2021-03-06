'use strict';

/* Directives */


angular.module('myApp.directives', ['ngRoute']).
    // btnRadio directive from angular UI
    constant('buttonConfig', {
        activeClass: 'active',
        toggleEvent: 'click'
    }).
    directive('btnRadio', ['buttonConfig', function (buttonConfig) {
        var activeClass = buttonConfig.activeClass || 'active';
        var toggleEvent = buttonConfig.toggleEvent || 'click';

        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {

                //model -> UI
                ngModelCtrl.$render = function () {
                    element.toggleClass(activeClass, angular.equals(ngModelCtrl.$modelValue, scope.$eval(attrs.btnRadio)));
                };

                //ui->model
                element.bind(toggleEvent, function () {
                    if (!element.hasClass(activeClass)) {
                        scope.$apply(function () {
                            ngModelCtrl.$setViewValue(scope.$eval(attrs.btnRadio));
                            ngModelCtrl.$render();
                        });
                    }
                });
            }
        };
    }]).
    // star rating directive based on fundoo directive tutorial
    // http://www.befundoo.com/university/tutorials/angularjs-directives-tutorial/
    directive('starRating', function () {
        return {
            restrict: 'A',
            template: '<ul class="rating">' +
                '<li ng-repeat="star in stars" ng-click="toggle($index)">' +
                '<span class="glyphicon" ng-class="{\'glyphicon-star\': star.filled, \'glyphicon-star-empty\': !star.filled}"></span>' +
                '</li>' +
                '</ul>',
            scope: {
                ratingValue: '=',
                max: '=',
                readonly: '@',
                onRatingSelected: '&'
            },
            link: function (scope, elem, attrs) {

                var updateStars = function() {
                    scope.stars = [];
                    for (var  i = 0; i < scope.max; i++) {
                        scope.stars.push({filled: i < scope.ratingValue});
                    }
                };

                scope.toggle = function(index) {
                    if (scope.readonly && scope.readonly === 'true') {
                        return;
                    }
                    scope.ratingValue = index + 1;
                    scope.onRatingSelected({rating: index + 1});
                };

                scope.$watch('ratingValue', function(oldVal, newVal) {
                    if (newVal) {
                        updateStars();
                    }
                });
            }
        }
    });
