/**
 *  Declare app level module
 */
angular.module('app', ['ui.bootstrap', 'timestamp'])
    .controller('mainCtrl', ['$scope', '$log', 'LargeInteger',
        function ($scope, $log, LargeInteger) {

            $scope.inputValue = '1303097596260000';


                $scope.largeInt = new LargeInteger($scope.inputValue);


            $scope.createLargeInteger = function () {
                $scope.largeInt = new LargeInteger($scope.inputValue)
            }

            $scope.validationValue = LargeInteger.UNSPECIFIED;

            $scope.updateValidator = function () {
                $scope.validationValue = LargeInteger.NEVER;
            }

        }
    ]);
