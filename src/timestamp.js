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
 *      Usage: <timestamp-input ng-model="timestamp"></div>
 *          timestamp : Timestamp - Timestamp class instance
 *
 *   The 'timestamp-from' directive can be used to validate 'timestamp-input' minimal value.
 *   Input is considered valid if value more then specified in attribute
 *      Usage: <timestamp-input ng-model="timestamp" timestamp-more-then="minValue">
 *          minValue : string or Angular expression - int64 value in string format
 *      Timestamp class can be used to represent Unspecified value (Timestamp.UNSPECIFIED)
 *      or get value from specified date (Timestamp.fromDate(date) where date is JS Date object).
 *
 *   The 'timestamp-less-then' directive can be used to validate 'timestamp-input' maximum value.
 *   Input is considered valid if value less then specified in attribute
 *      Usage: <timestamp-input ng-model="timestamp" timestamp-less-then="maxValue">
 *          maxValue : string or Angular expression - int64 value in string format
 *      Timestamp class can be used to represent Never value (Timestamp.NEVER)
 *      or get value from specified date (Timestamp.fromDate(date) where date is JS Date object).
 *
 *
 */

angular.module('timestamp', [])
    .config(['$provide', function ($provide) {

        $provide.decorator('$parse', function ($delegate) {
            return function (expression) {
                var parsed = $delegate(expression);
                if (parsed.assign) {
                    var dac =parsed;
                }

                // getter
                var wrapper = function (scope, locals) {
                    var val = parsed(scope, locals);

                    return val;
                };

                // setter
                wrapper.assign = function (scope, value) {
                    var val = parsed(scope);

                    return parsed.assign(scope, value);
                };

                return wrapper;
            };
        });


    }])

    .factory('Timestamp', ['$log', function ($log) {

        var Timestamp = function (value) {

            // The difference between the Windows and Unix epoch in milliseconds
            var WINDOWS_TIME_EPOCH_SHIFT = 11644473600000;

            // Represents Unspecified value
            Timestamp.UNSPECIFIED = '0';

            // Represents Never value
            Timestamp.NEVER = '9223372036854775807';

            // Returns timestamp value calculated with specified date
            Timestamp.fromDate = function (date) {
                // Get date in milliseconds add epoch shift an convert to 100 nanoseconds
                return (date.getTime() + WINDOWS_TIME_EPOCH_SHIFT) + "0000";
            };

            // Initialize instance value
            this.value = value;

            // Customizes JSON stringification behavior
            this.toJSON = function () {
                return this.value;
            };

            // Overrides object.toString()
            this.toString = function () {
                var result;
                if (this.isNever()) {
                    result = 'NEVER';
                }
                else if (this.isUnspecified()) {
                    result = 'UNSPECIFIED';
                }
                else {
                    result = this.toDate().toString();
                }

                return result;
            };

            // Compares an instance value with specified value
            this.compareTo = function (valueToCompare) {
                return convertInt64StringToMilliseconds(this.value)
                    - convertInt64StringToMilliseconds(valueToCompare);
            };

            // Converts an instance value to JS Date
            this.toDate = function () {

                // Iv value can not be converted - return 'undefined'
                if (!this.isDate()) {
                    return undefined;
                }

                // Get in milliseconds, shift epoch and convert to JS Date
                return new Date(convertInt64StringToMilliseconds(this.value)
                    - WINDOWS_TIME_EPOCH_SHIFT);

            };

            // Updates an instance value with specified date
            this.setFromDate = function (date) {
                this.value = Timestamp.fromDate(date);
            };

            // Returns true if the instance has Unspecified value
            this.isUnspecified = function () {
                return this.value === Timestamp.UNSPECIFIED;
            }

            // Returns true if the instance has Never value
            this.isNever = function () {
                return this.value === Timestamp.NEVER;
            }

            Timestamp.isDate = function(value) {
                //return !this.isUnspecified() && !this.isNever();
                return value !== Timestamp.NEVER && value !== Timestamp.UNSPECIFIED;
            }

            // Returns true if the instance value can be represent as JS Date
            this.isDate = function () {
                return !this.isUnspecified() && !this.isNever();
            }

            // Convert Int64 string value to Date
            var convertInt64StringToMilliseconds = function (value) {

                var valueLength = value.length;

                // Return milliseconds from FileTime string value
                return numberValue = valueLength < 5
                    ? 0
                    : Number(value.slice(0, valueLength - 4));
            };

            this.setter = function(value) {
                if (angular.isDate(value)) {
                    this.setFromDate(value);
                }
                else {
                    this.value = value;
                }

                return this.value;
            };

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
            require: 'ngModel',
            restrict: 'AE',
            templateUrl: '../src/timestamp-input.tpl.html',
            scope: {
                value: '=ngModel',
                setter: "&"
            },
            link: function (scope, element, attrs, ngModelCtrl) {

                // Represents 'Unspecified' timestamp value
                scope.UNSPECIFIED = Timestamp.UNSPECIFIED;

                // Represents 'Never' timestamp value
                scope.NEVER = Timestamp.NEVER;

                // Set default datepicker value
                scope.datepickerDate = clearTime(new Date());

                // Indicates what model was changed by user from datepicker
                var itIsUserInput = false;

                // Updates a timestamp value
                scope.setViewValue = function (value) {

                    var newValue = scope.setter({value : value})

                    ngModelCtrl.$setViewValue(newValue);

                    return newValue;

                };

                var updateModel = function (value) {
                    $log.log('parse');
                    return value;
                };

                ngModelCtrl.$parsers.push(updateModel);


                var testFormatter = function (value) {
                    $log.log('format');
                    return value;
                };

                ngModelCtrl.$formatters.push(testFormatter);

                var updateView = function () {
                    // INFO: make all inner model update here

                    //TODO change to viewValue or modelValue
                    if (Timespan.isDate(ngModelCtrl.$viewValue)) {
                        // Change datepicker value with new date
                        scope.datepickerDate = Timespan.toDate(ngModelCtrl.$viewValue);

                        // Datepicker value was updated outside directive
                        // $watch for datepickerDate should not update timestamp in this loop
                        itIsUserInput = false;

                        // Synchronise radio input value with timestamp value
                        scope.valueToCompare = ngModelCtrl.$viewValue;
                    }
                };

                ngModelCtrl.$render = function () {
                    updateView();
                };

                scope.$watch('datepickerDate', function (value) {

                    // If datepicker value was updated from datepicker
                    if (itIsUserInput) {

                        // Update timestamp
                        scope.valueToCompare = scope.setViewValue(clearTime(value));

                    }
                    else {
                        // Stay watching
                        itIsUserInput = true;
                    }
                });
            }
        };
    }])

    .directive('timestampMoreThen', ['$log',
        function ($log) {
            return {
                require: '?ngModel',
                restrict: 'A',
                link: function (scope, element, attrs, ngModelCtrl) {

                    // If ng-model exist
                    if (ngModelCtrl) {

                        scope.$watch(attrs.timestampMoreThen, function () {
                            ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
                        });

                        // Observe the attribute value
                        /*attrs.$observe('timestampMoreThen',
                         function (value) {
                         validate(null, value);
                         }
                         );*/

                        var validate = function (viewValue, validationAttrValue) {

                            var timestamp = viewValue || ngModelCtrl.$viewValue;

                            var validationValue = validationAttrValue || attrs.timestampMoreThen;

                            var result = timestamp.instance.compareTo(validationValue) > 0;

                            $log.log('validation - ' + result);

                            // Set validity
                            ngModelCtrl.$setValidity('timestampMoreThen',
                                result);

                            //TODO: try return valid ? myValue : undefined
                            return timestamp;
                        };

                        ngModelCtrl.$parsers.push(validate);
                        ngModelCtrl.$formatters.push(validate);

                    }
                }
            };
        }]
    )

    /*.directive('timestampLessThen', ['$log',
     function ($log) {
     return {
     require: '?ngModel',
     restrict: 'A',
     link: function (scope, element, attrs, ngModelCtrl) {

     // If ng-model exist
     if (ngModelCtrl) {
     // Deep watch for ngModelCtrl.$modelValue change
     scope.$watch(
     function () {
     return ngModelCtrl.$modelValue;
     },
     function (value) {
     validate(value, null);
     },
     true
     );

     // Observe the attribute value
     attrs.$observe('timestampLessThen',
     function (value) {
     validate(null, value);
     }
     );

     var validate = function (innerModel, validationAttrValue) {

     var timestamp = innerModel || ngModelCtrl.$viewValue;

     var validationValue = validationAttrValue || attrs.timestampLessThen;

     // Set validity
     ngModelCtrl.$setValidity('timestampLessThen',
     timestamp.compareTo(validationValue) < 0);
     };
     }
     }
     };
     }]
     )*/;


