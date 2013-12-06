/**
 *  Declare app level module
 */
angular.module('app', ['ui.bootstrap', 'timestamp'])
    .controller('mainCtrl', ['$scope', '$log', 'Timestamp', function ($scope, $log, Timestamp) {
        //$scope.ts = new Timestamp('1303097596260000');
        $scope.ts = new Timestamp('0');
    }]);
