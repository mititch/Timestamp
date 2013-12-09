/**
 *   The component provides the ability to work with Windows FileDate
 *
 *   The 'Timestamp' factory returns constructor which may be used to wrap Windows FileDate
 *   value as JS object
 *      Usage: new Timestamp(value)
 *          value : string - int64 value in string format
 *      Fields:
 *          value - int64 value in string format
 *      Methods:
 *          toDate() - returns instance value as JS Date
 *          isUnspecified() - returns true if the instance has Unspecified value
 *          isNever() - returns true if the instance has Never value
 *          isDate() - returns true if the instance value can be represent as JS Date
 *          setFromDate() - updates an instance value from specified date
 *      Overrides toString() and toJSON() functions.
 *
 *
 *   The 'timestamp-input' directive may be used to update Timestamp instance by user
 *      Usage: <div timestamp-input="timestamp"></div>
 *          timestamp : Timestamp - Timestamp class instance
 *
 */

angular.module('timestamp', [])
    .factory('Timestamp', ['$log', function ($log) {

        var Timestamp = function (value) {

            // The difference between the Windows and Unix epoch in milliseconds
            var WINDOWS_TIME_EPOCH_SHIFT = 11644473600000;

            // Represents Unspecified value
            Timestamp.UNSPECIFIED = '0';

            // Represents Never value
            Timestamp.NEVER = '9223372036854775807';

            // Initialize instance value
            this.value = value;

            // Customizes JSON stringification behavior
            this.toJSON = function () {
                return this.value;
            };

            // Overrides object.toString()
            this.toString = function () {
                var result;
                if (this.isNever())
                {
                    result = 'NEVER';
                }
                else if (this.isUnspecified())
                {
                    result = 'UNSPECIFIED';
                }
                else
                {
                    result = this.toDate().toString();
                }

                return result;
            };

            // Converts an instance value to JS Date
            this.toDate = function () {

                // Iv value can not be converted - return 'undefined'
                if (!this.isDate())
                {
                    return undefined;
                }

                var valueLength = this.value.length;

                // Get milliseconds from FileTime string value
                var numberValue = valueLength < 5
                    ? 0
                    : Number(this.value.slice(0, valueLength - 4));

                // Shift epoch and convert to JS Date
                return new Date(numberValue - WINDOWS_TIME_EPOCH_SHIFT);

            };

            // Updates an instance value with specified date
            this.setFromDate = function (date) {
                // Get date in milliseconds add epoch shift an convert to 100 nanoseconds
                this.value = (date.getTime() + WINDOWS_TIME_EPOCH_SHIFT) + "0000";
            };

            // Returns true if the instance has Unspecified value
            this.isUnspecified = function () {
                return this.value === Timestamp.UNSPECIFIED;
            }

            // Returns true if the instance has Never value
            this.isNever = function () {
                return this.value === Timestamp.NEVER;
            }

            // Returns true if the instance value can be represent as JS Date
            this.isDate = function () {
                return !this.isUnspecified() && !this.isNever();
            }
        };

        // Return constructor function
        return Timestamp;

    }])

    .directive('timestampInput', ['Timestamp', '$log', function (Timestamp, $log) {

        // Remove time part of JS Date object
        var clearTime = function (date) {
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
            return date;
        };

        return {
            restrict: 'A',
            templateUrl: '../src/timestamp-input.tpl.html',
            scope: {
                timestamp: '=timestampInput'
            },
            link: function (scope) {

                // Represents 'Unspecified' timestamp value
                scope.UNSPECIFIED = Timestamp.UNSPECIFIED;

                // Represents 'Never' timestamp value
                scope.NEVER = Timestamp.NEVER;

                // Set default datepicker value
                scope.datepickerDate = clearTime(new Date());

                // Indicates what model was changed by user from datepicker
                var itIsUserInput = false;

                // Updates a timestamp value
                scope.updateTimestamp = function (date) {

                    scope.timestamp.setFromDate(date);
                };

                scope.$watch('timestamp.value', function (value) {

                    // If the timestamp value is changed from the outside
                    // and can be represents as date
                    if (value !== Timestamp.UNSPECIFIED && value !== Timestamp.NEVER)
                    {
                        // Change datepicker value with new date
                        scope.datepickerDate = scope.timestamp.toDate();

                        // Datepicker value was updated outside directive
                        // $watch for datepickerDate should not update timestamp in this loop
                        itIsUserInput = false;

                        // Synchronise radio input value with timestamp value
                        scope.valueToCompare = value;
                    }
                });

                scope.$watch('datepickerDate', function (value) {

                    // If datepicker value was updated from datepicker
                    if (itIsUserInput)
                    {
                        // Update timestamp
                        scope.updateTimestamp(clearTime(value));
                    }
                    else
                    {
                        // Stay watching
                        itIsUserInput = true;
                    }
                });
            }
        };
    }]);


