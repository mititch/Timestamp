/**
 *   The component provides the ability to work with Windows FileDate
 *
 *   The 'LargeInteger' factory returns constructor which may be used to wrap Windows FileDate
 *   value as JS object
 *      Usage: new LargeInteger(value)
 *          value : string|number|Date - int64 value in string format on number or Date
  *      Fields:
 *          value - int64 value in string format
 *      Methods:
 *          getValue() - returns value
 *          compareTo(valueToCompere) - compares as instance value with valueToCompare
 *              valueToCompere : string|number
 *          getAsDate() - returns instance value as JS Date
 *          isUnspecified() - returns true if the instance has Unspecified value
 *          isNever() - returns true if the instance has Never value
 *          isDate() - returns true if the instance value can be represent as JS Date
 *      Overrides toString() and toJSON() functions.
 *
 *   The 'timestamp-editor' directive may be used to reset LargeInteger variable
 *      Usage: <timestamp-input ng-model="largeInteger"></div>
 *          largeInteger : LargeInteger - LargeInteger class instance
 *
 *   The 'timestamp-more-then' directive can be used to validate 'timestamp-editor' minimal value.
 *   Input is considered valid if value more then specified in attribute
 *      Usage: <timestamp-input ng-model="largeInteger" timestamp-more-then="minValue">
 *          minValue : string|number
 *      LargeInteger class can be used to represent Unspecified value (LargeInteger.UNSPECIFIED)
 *      or get value from specified date ( new LargeInteger(date).getValue() -
 *      where date is JS Date object).
 *
 *   The 'timestamp-less-then' directive can be used to validate 'timestamp-editor' maximum value.
 *   Input is considered valid if value less then specified in attribute
 *      Usage: <timestamp-input ng-model="largeInteger" timestamp-less-then="maxValue">
 *          maxValue : string|number
 *      LargeInteger class can be used to represent Never value (LargeInteger.NEVER)
 *      or get value from specified date (new LargeInteger(date).getValue() -
 *      where date is JS Date object).
 *
 *
 */

angular.module('timestamp', [])

    //
    // LargeInteger factory
    //

    .factory('LargeInteger', ['$log', function ($log) {

        var LargeInteger = function (value) {

            // Represents Unspecified value
            LargeInteger.UNSPECIFIED = 0;

            // Represents Never value
            LargeInteger.NEVER = '9223372036854775807';

            // Maximum number value in JS
            var MAX_JS_NUMBER = 9223372036854770000;

            // Valid string value length
            var MAX_VALUE_LENGTH = LargeInteger.NEVER.length;

            // The difference between the Windows and Unix epoch in milliseconds
            var WINDOWS_TIME_EPOCH_SHIFT = 11644473600000;

            // Value parser
            var parse = function (value) {

                var result;

                if (angular.isString(value))
                {
                    if (value.length > MAX_VALUE_LENGTH) {
                        // Value can not be represent as LargeInteger
                        return;
                    }

                    // Try save value as number
                    result = Number(value);

                    // If value more then max JS number save it as string
                    if (!(result <= MAX_JS_NUMBER)) {
                        result = value;
                    }

                }
                else if (angular.isNumber(value)) {
                    result = value;
                }
                else if (angular.isDate(value)) {
                    // Get date in milliseconds add epoch shift an convert to 100 nanoseconds
                    result = (value.getTime() + WINDOWS_TIME_EPOCH_SHIFT) * 10000;
                }

                return result;
            };

            // Instance initialization

            var numberValue;        // Contains value is it can be parsed as number
            var stringValue;        // Contains value is it can not be parsed as number

            var parsedValue = parse(value);

            angular.isNumber(parsedValue) ? numberValue = parsedValue : stringValue = parsedValue;

            // Value getter
            this.getValue = function () {
                return stringValue || numberValue;
            };

            // Customizes JSON stringification behavior
            this.toJSON = function () {
                return stringValue ? stringValue : numberValue.toString();
            };

            // Overrides object.toString()
            this.toString = function () {
                return this.getValue().toString();
            };

            // Compares an instance value with specified value
            this.compareToOLD = function (valueToCompare) {

                if (angular.isNumber(valueToCompare))
                {
                    // Any string value is more then any number
                    return stringValue ? 1 : numberValue - valueToCompare;
                }
                else if (angular.isString(valueToCompare))
                {

                    if (stringValue == valueToCompare) {
                        // Strings equals
                        return 0;
                    }
                    else if (valueToCompare.length != MAX_VALUE_LENGTH) {
                        // valueToCompare has invalid length
                        return undefined;
                    }
                    else {
                        // Compare strings
                        return stringValue > valueToCompare ? 1 : -1
                    }

                }
                else if (valueToCompare instanceof LargeInteger)
                {
                    return this.compareTo(valueToCompare.getValue());
                }

                return undefined;

            };

            // Compares an instance value with specified value
            this.compareTo = function (value) {

                // Get value to compare from instance or parse
                var valueToCompare =  value instanceof LargeInteger ? value.getValue()
                    : parse(value);

                if (angular.isNumber(valueToCompare))
                {
                    // Any string value is more then any number
                    return stringValue ? 1 : numberValue - valueToCompare;
                }
                else if (angular.isString(valueToCompare))
                {
                    // String value
                    if (stringValue == valueToCompare)
                    {
                        // Strings equals
                        return 0;
                    }
                    else
                    {
                        // Compare strings
                        return stringValue > valueToCompare ? 1 : -1
                    }
                }

                // valueToCompare is invalid;
                return undefined;
            };


            // Converts an instance value to JS Date
            this.getAsDate = function () {

                // If value can not be converted - return 'undefined'
                if (!this.isDate()) {
                    return undefined;
                }
                // Get in milliseconds, shift epoch and convert to JS Date
                return new Date(numberValue / 10000 - WINDOWS_TIME_EPOCH_SHIFT);

            };

            // Returns true if the instance has Unspecified value
            this.isUnspecified = function () {
                return !stringValue && numberValue === LargeInteger.UNSPECIFIED;
            }

            // Returns true if the instance has Never value
            this.isNever = function () {
                return stringValue && stringValue === LargeInteger.NEVER || false;
            }

            // Returns true if the instance value can be represent as JS Date
            this.isDate = function () {
                return numberValue && !this.isUnspecified() || false;
            }

        };

        // Return constructor function
        return LargeInteger;

    }])

    //
    // timestamp-editor directive
    //

    .directive('timestampEditor', ['LargeInteger', function (LargeInteger) {

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
            templateUrl: '../src/timestamp-editor.tpl.html',
            scope: {},
            link: function (scope, element, attrs, ngModelCtrl) {

                // Represents 'Unspecified' timestamp value
                scope.UNSPECIFIED = LargeInteger.UNSPECIFIED;

                // Represents 'Never' timestamp value
                scope.NEVER = LargeInteger.NEVER;

                // Set default datepicker value
                scope.datepickerDate = clearTime(new Date());

                // Indicates what model was changed by user from datepicker
                var itIsUserInput = false;

                // Updates a view model
                scope.setValue = function (value) {

                    // Create new instance
                    var newModel = new LargeInteger(value);

                    if (newModel.isDate())
                    {
                        // Update date section
                        scope.valueToCompare = newModel.getValue();
                        scope.radioButtonsValue = newModel.getValue();
                    }

                    ngModelCtrl.$setViewValue(newModel);

                };

                ngModelCtrl.$render = function () {

                    //Cache new value
                    var newValue = ngModelCtrl.$viewValue.getValue();

                    if (ngModelCtrl.$viewValue.isDate())
                    {
                        // Change datepicker value with new date
                        scope.datepickerDate = ngModelCtrl.$viewValue.getAsDate();

                        // Datepicker value was updated outside directive
                        // $watch for datepickerDate should not update view model
                        itIsUserInput = false;

                        // Synchronise radio input value with new value
                        scope.valueToCompare = newValue;

                    }
                    // Update radio buttons
                    scope.radioButtonsValue = newValue;

                };

                scope.$watch('datepickerDate', function (value) {
                    if (itIsUserInput)
                    {
                        if (value)
                        {
                            // If datepicker value was updated from datepicker and has value
                            scope.setValue(clearTime(value))
                        }
                        else
                        {
                            // Clear button fix
                            scope.datepickerDate = new Date();
                        }

                    }
                    else
                    {
                        // Stay watching
                        itIsUserInput = true;
                    }
                });
            }
        };
    }])

    //
    // timestamp-more-then validation directive
    //

    .directive('timestampMoreThen', ['$parse',
        function ($parse) {
            return {
                require: '?ngModel',
                restrict: 'A',
                link: function (scope, element, attrs, ngModelCtrl) {

                    // If ng-model exist
                    if (ngModelCtrl)
                    {
                        var validationValueGetter = $parse(attrs.timestampMoreThen);

                        scope.$watch(
                            function () {
                                // Watch for validation value changes
                                return validationValueGetter(scope)
                            },
                            function (value, oldValue) {
                                // Prevent init iteration
                                if (value !== oldValue) {
                                    validate(null, value);
                                }
                            }
                        );

                        var validate = function (viewValue, validationValue) {
                            // Prepare view value
                            viewValue = viewValue || ngModelCtrl.$viewValue;

                            // Prepare validation attribute value
                            validationValue = validationValue || validationValueGetter(scope);

                            // Compare values
                            var result = viewValue.compareTo(validationValue) > 0;

                            // Set validity
                            ngModelCtrl.$setValidity('timestampMoreThen', result);

                            return viewValue;
                        };

                        // Add validator to pipeline
                        ngModelCtrl.$parsers.push(validate);
                        ngModelCtrl.$formatters.push(validate);

                    }
                }
            };
        }]
    )

    //
    // timestamp-less-then validation directive
    //

    .directive('timestampLessThen', ['$parse',
        function ($parse) {
            return {
                require: '?ngModel',
                restrict: 'A',
                link: function (scope, element, attrs, ngModelCtrl) {

                    // If ng-model exist
                    if (ngModelCtrl)
                    {
                        // Parse attribute
                        var validationValueGetter = $parse(attrs.timestampLessThen);

                        scope.$watch(
                            function () {
                                // Watch for validation value changes
                                return validationValueGetter(scope)
                            },
                            function (value, oldValue) {
                                // Prevent init iteration
                                if (value !== oldValue) {
                                    validate(null, value);
                                }
                            }
                        );

                        var validate = function (viewValue, validationValue) {
                            // Prepare view value
                            viewValue = viewValue || ngModelCtrl.$viewValue;

                            // Prepare validation attribute value
                            validationValue = validationValue || validationValueGetter(scope);

                            // Compare values
                            var result = viewValue.compareTo(validationValue) < 0;

                            // Set validity
                            ngModelCtrl.$setValidity('timestampLessThen', result);

                            return viewValue;
                        };

                        // Add validator to pipeline
                        ngModelCtrl.$parsers.push(validate);
                        ngModelCtrl.$formatters.push(validate);

                    }
                }
            };
        }]
    );