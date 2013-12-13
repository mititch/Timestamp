/**
 *   The component provides the ability to work with Windows FileDate
 *
 *   The 'LargeInteger' factory returns constructor which may be used to wrap Windows FileDate
 *   value as JS object
 *      Usage: new LargeInteger(value)
 *          value : string|Date - int64 value in string format or Date
 *      Methods:
 *          getValue() - returns object with instance values
 *          compareTo(valueToCompere) - compares as instance value with valueToCompare
 *              valueToCompere : string|Date|LargeInteger
 *          getAsDate() - returns instance value as JS Date
 *          isUnspecified() - returns true if the instance has Unspecified value
 *          isNever() - returns true if the instance has Never value
 *      Overrides toString() and toJSON() functions.
 *
 *   The 'timestamp-editor' directive may be used to reset LargeInteger variable
 *      Usage: <timestamp-input ng-model="largeInteger"></div>
 *          largeInteger : LargeInteger - LargeInteger class instance
 *
 *   The 'timestamp-more-then' directive can be used to validate 'timestamp-editor' minimal value.
 *   Input is considered valid if value more then specified in attribute
 *      Usage: <timestamp-input ng-model="largeInteger" timestamp-more-then="minValue">
 *          minValue : string|number|LargeInteger
 *      LargeInteger class can be used to represent Unspecified value (LargeInteger.UNSPECIFIED)
 *      or get value from specified date ( new LargeInteger(date) -
 *      where date is JS Date object).
 *
 *   The 'timestamp-less-then' directive can be used to validate 'timestamp-editor' maximum value.
 *   Input is considered valid if value less then specified in attribute
 *      Usage: <timestamp-input ng-model="largeInteger" timestamp-less-then="maxValue">
 *          maxValue : string|number|LargeInteger
 *      LargeInteger class can be used to represent Never value (LargeInteger.NEVER)
 *      or get value from specified date (new LargeInteger(date) -
 *      where date is JS Date object).
 *
 */

angular.module('timestamp', [])

    //
    // LargeInteger factory
    //

    .factory('LargeInteger', ['$log', function ($log) {

        // Parts of NEVER
        var NEVER_HI_PART = 922337203685477;
        var NEVER_LOW_PART = 5807;

        // The difference between the Windows and Unix epoch in milliseconds
        var WINDOWS_TIME_EPOCH_SHIFT = 11644473600000;

        var stringTester = new RegExp('^-?[0-9]{1,19}$');

        // Parses a string or Date value
        //      value : string|Date
        var parse = function (value) {

            if (angular.isString(value))
            {
                if (value === LargeInteger.NEVER)
                {
                    return {hi: NEVER_HI_PART, low : NEVER_LOW_PART};
                }
                else if (value === LargeInteger.UNSPECIFIED)
                {
                    return {hi: 0, low: 0};
                }
                else
                {
                    // If string can be parsed
                    if (stringTester.test(value)) {

                        // Return data object
                        // Both parts is signed
                        return {
                            hi : parseInt(value.substr(0, value.length - 4)) || 0,
                            low : parseInt(value.slice(-5)) % 10000
                        };
                    }
                }
            }
            else if (angular.isDate(value))
            {
                return {
                    hi : value.getTime() + WINDOWS_TIME_EPOCH_SHIFT,
                    low : 0
                };
            }
                // Can not parse value
                // return undefined;
                throw "LargeInteger: Can not parse value - " + value;

        };

        var LargeInteger = function (value) {

            // Instance initialization

            var parsedValue = parse(value);

            var hiPart = parsedValue.hi;

            var lowPart = parsedValue.low;

            // Value getter
            this.getValue = function () {
                return {hi : hiPart, low : lowPart};
            };

            // Overrides object.toString()
            this.toString = function () {

                if (hiPart)
                {
                    return hiPart.toString() +
                        (Math.abs(lowPart) + 10000).toString().slice(1,5);
                }
                else
                {
                    return lowPart.toString() ;
                }
            };

            // Customizes JSON stringification behavior
            this.toJSON = function () {
                return this.toString();
            };

            // Compares an instance value with specified value
            //      value : string|Date|LargeInteger
            this.compareTo = function (value) {

                // Get value to compare from instance or parse
                var compared =  value instanceof LargeInteger ? value.getValue()
                    : parse(value);

                return hiPart == compared.hi
                    ? lowPart - compared.low
                    : hiPart - compared.hi;
            };


            // Converts an instance value to JS Date
            this.getAsDate = function () {
                // Get in milliseconds, shift epoch and convert to JS Date
                return new Date(hiPart - WINDOWS_TIME_EPOCH_SHIFT);
            };

            // Returns true if the instance has Unspecified value
            this.isUnspecified = function () {
                return hiPart === 0 && lowPart === 0;
            };

            // Returns true if the instance has Never value
            this.isNever = function () {
                return hiPart === NEVER_HI_PART && lowPart === NEVER_LOW_PART;
            };

        };

        // Represents Unspecified value
        LargeInteger.UNSPECIFIED = '0';

        // Represents Never value
        LargeInteger.NEVER = '' + NEVER_HI_PART + NEVER_LOW_PART;

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

        // Returns true if the LargeInteger instance value can be represent as JS Date
        var canBeDate = function (largeInteger) {
            return !largeInteger.isUnspecified() && !largeInteger.isNever();
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

                    if (canBeDate(newModel))
                    {
                        // Update date section
                        scope.dateRadioButtonValue = newModel.toString();
                        scope.radioButtonsValue = newModel.toString();
                    }

                    ngModelCtrl.$setViewValue(newModel);

                };

                ngModelCtrl.$render = function () {

                    //Cache new value
                    var newValue = ngModelCtrl.$viewValue.toString();

                    if (canBeDate(ngModelCtrl.$viewValue))
                    {
                        // Change datepicker value with new date
                        scope.datepickerDate = ngModelCtrl.$viewValue.getAsDate();

                        // Datepicker value was updated outside directive
                        // $watch for datepickerDate should not update view model
                        itIsUserInput = false;

                        // Synchronise radio input value with new value
                        scope.dateRadioButtonValue = newValue;

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