/**
 *  Declare app level module
 */
angular.module('app', ['ui.bootstrap', 'timestamp'])
    .controller('mainCtrl', ['$scope', '$log', 'Timestamp',
        function ($scope, $log, Timestamp) {

            $scope.ts = new Timestamp({value: '1303097596260000'});

            $scope.validationValue = Timestamp.UNSPECIFIED;
            //$scope.validationValue = Timestamp.NEVER;
            //$scope.validationValue = Timestamp.fromDate(new Date());

        }
    ]);
