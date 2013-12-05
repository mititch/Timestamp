

angular.module('app', ['ui.timestamp'])
    .controller('mainCtrl', ['$scope', '$log', function ($scope, $log) {
        $scope.someValue = 1001010;
    }]);
