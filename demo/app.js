

angular.module('app', ['ui.bootstrap', 'ui.timestamp'])
    .controller('mainCtrl', ['$scope', '$log', function ($scope, $log) {
        $scope.someValue = 1001010;
    }]);
