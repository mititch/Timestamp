angular.module('ui.timestamp', [])
    .factory('Timestamp', ['$log', function ($log) {

        var Timestamp = function (value) {

            Timestamp.UNSPECIFIED = '0';

            Timestamp.NEVER = '9223372036854775807';

            var CORRELATION = Number(11644473600000);

            this.value = value;

            this.toJSON = function () {
                return this.value;
            };

            this.toString = function () {
                var result;
                if (this.isNever()) {
                    result = 'NEVER';
                }
                else if (this.isUnspecified()) {
                    result = 'UNSPECIFIED';
                }
                else {
                    result = this.toDate();
                }

                return result;
            };

            this.toDate = function () {
                if (!this.isDate()) {
                    return undefined;
                }
                var valueLength = this.value.length;
                var numberValue = valueLength < 5
                    ? 0
                    : Number(this.value.slice(0, valueLength - 4));

                var date = new Date(numberValue - CORRELATION);

                return date;
            };

            this.isUnspecified = function () {
                return this.value == Timestamp.UNSPECIFIED;
            }

            this.isNever = function () {
                return this.value == Timestamp.NEVER;
            }

            this.isDate = function () {
                return !this.isUnspecified() && !this.isNever();
            }

            this.setFromDate = function (date) {
                $log.log('time changed to - ' + date.getTime());
                this.value = (date.getTime() + CORRELATION) + "0000";
            };

        };

        return Timestamp;

    }])

    .directive('timestampInput', ['$log', 'Timestamp', function ($log, Timestamp) {
        return {
            restrict: 'A',
            templateUrl: '../src/timestamp-input.tpl.html',
            scope: {
                timestamp: '=timestampInput'
            },
            link: function (scope) {

                scope.UNSPECIFIED = Timestamp.UNSPECIFIED;

                scope.NEVER = Timestamp.NEVER;

                scope.dateInputValue = new Date();

                scope.updateTimestamp = function (value, oldValue) {
                    if (value !== oldValue) {
                        scope.timestamp.setFromDate(new Date(value));
                    }
                };

                var isDirty = false;

                scope.$watch('timestamp.value', function (value) {
                    if (value && value != scope.UNSPECIFIED && value != scope.NEVER) {

                        scope.value = value;
                        isDirty = false;
                        scope.dateInputValue = scope.timestamp.toDate();
                    }
                });

                scope.$watch('dateInputValue', function (value, oldValue) {
                    if (value !== oldValue && isDirty) {
                        scope.timestamp.setFromDate(new Date(value.getFullYear(), value.getMonth(), value.getDay()));
                    }
                    isDirty = true;
                });

            }
        };
    }]);


