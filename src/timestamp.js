angular.module('ui.timestamp', [])
    .directive('timestamp', ['$log', function ($log) {
        return {
            require: "^ngModel",
            restrict: 'A',
            templateUrl: '../src/timestamp.tpl.html',
            link: function (scope, element, attrs, ngModelCtrl) {

                scope.innerModel = {};

                scope.dataInputValue = 1000;

                scope.$watch(
                    function () {
                        return ngModelCtrl.$viewValue
                    }, function (value) {
                        scope.innerModel.value = value
                    });

                scope.$watch('dataInputValue', function (value) {
                        scope.innerModel.value = value;
                    });



            }
        };
    }]);


