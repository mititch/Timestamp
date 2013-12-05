angular.module('ui.timestamp', [])
    .service('timestamp', function() {

        var Timestamp = function () {
        };

        Timestamp.prototype.toString() = function () {
            return '[Object Timestamp]';
        };

    })
    .directive('timestampInput', ['$log', function ($log) {
        return {
            require: "^ngModel",
            restrict: 'A',
            templateUrl: '../src/timestamp.tpl.html',
            scope : {
                outerModel : '=ngModel'
            },
            link: function (scope, element, attrs, ngModelCtrl) {

                scope.UNSPECIFIED = 0;
                scope.NEVER = Number.MAX_VALUE;

                scope.innerModel = {};

                scope.dataInputValue = new Date();

                //date.valueOf()

                /*scope.$watch(
                    function () {
                        return ngModelCtrl.$viewValue
                    }, function (value) {
                        scope.innerModel.value = value
                    });*/

                scope.$watch('innerValue', function (value) {
                        scope.outerModel = value;
                    });

                scope.$watch('outerModel', function (value) {
                    if (!value || value == scope.UNSPECIFIED || value == scope.NEVER) { return;}
                    scope.dataInputValue.setTime(parseInt(value/10000)-100000000000000);
                    scope.innerValue = value;
                });

                scope.$watch('dataInputValue', function (value) {
                    outerModel = value;
                });


            }
        };
    }]);


