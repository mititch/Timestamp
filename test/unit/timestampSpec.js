'use strict';

/* jasmine specs for timestamp module */

describe('timestamp module', function () {

    var WINDOWS_FILE_TIME_ARRAY = [
        {
            ft: '120513686052310000',       // Middle value
            hour: 12,
            minute: 23,
            second: 25,
            millisecond: 231,
            year: 1982,
            month: 10,
            day: 23
        },
        {
            ft: '41341461012110000',        // LessThen value
            hour: 23,
            minute: 55,
            second: 1,
            millisecond: 211,
            year: 1732,
            month: 0,
            day: 3
        },
        {
            ft: '167569269012110000',       // More then value
            hour: 23,
            minute: 55,
            second: 1,
            millisecond: 211,
            year: 2132,
            month: 0,
            day: 3
        }
    ];

    //
    //  LargeInteger factory
    //

    describe('LargeInteger factory', function () {

        var LargeInteger;
        var largeInteger;


        var ftMap;

        beforeEach(function () {

            module('timestamp');

            // Provide any mocks needed
            module(function ($provide) {

            });

            inject(function (_LargeInteger_) {
                LargeInteger = _LargeInteger_;
            });
        });

        describe('then created', function () {

            describe('with "0" value', function () {

                it('should be "UNSPECIFIED"', function () {

                    largeInteger = new LargeInteger('0');

                    expect(largeInteger.getValue().low).toBe(0);
                    expect(largeInteger.getValue().hi).toBe(0);
                    expect(largeInteger.toString()).toBe('0');
                    expect(largeInteger.isUnspecified()).toBe(true);
                    expect(largeInteger.isNever()).toBe(false);

                });

            });

            describe('with "9223372036854775807" value', function () {

                it('should be "NEVER"', function () {

                    largeInteger = new LargeInteger('9223372036854775807');

                    expect(largeInteger.getValue().hi).toBe(922337203685477);
                    expect(largeInteger.getValue().low).toBe(5807);
                    expect(largeInteger.toString()).toBe('9223372036854775807');
                    expect(largeInteger.isUnspecified()).toBe(false);
                    expect(largeInteger.isNever()).toBe(true);


                });

            });

            describe('with some other value value', function () {

                it('should has valid value', function () {

                    largeInteger = new LargeInteger('100000000033300321');

                    expect(largeInteger.getValue().hi).toBe(10000000003330);
                    expect(largeInteger.getValue().low).toBe(321);
                    expect(largeInteger.toString()).toBe('100000000033300321');
                    expect(largeInteger.isUnspecified()).toBe(false);
                    expect(largeInteger.isNever()).toBe(false);
                    expect(angular.isDate(largeInteger.getAsDate())).toBe(true);

                });

            });

        });

        describe('then getAsDate() called', function () {

            describe('with [0] test value', function () {

                it('should return right date ', function () {

                    ftMap = WINDOWS_FILE_TIME_ARRAY[0];
                    largeInteger = new LargeInteger(ftMap.ft);

                    expect(largeInteger.isUnspecified()).toBe(false);
                    expect(largeInteger.isNever()).toBe(false);
                    expect(largeInteger.getAsDate().getFullYear()).toBe(ftMap.year);
                    expect(largeInteger.getAsDate().getMonth()).toBe(ftMap.month);
                    expect(largeInteger.getAsDate().getDate()).toBe(ftMap.day);
                    expect(largeInteger.getAsDate().getHours()).toBe(ftMap.hour);
                    expect(largeInteger.getAsDate().getMinutes()).toBe(ftMap.minute);
                    expect(largeInteger.getAsDate().getSeconds()).toBe(ftMap.second);
                    expect(largeInteger.getAsDate().getMilliseconds()).toBe(ftMap.millisecond);
                    expect(largeInteger.getAsDate().getTime()).toBe(new Date(ftMap.year, ftMap.month,
                        ftMap.day, ftMap.hour, ftMap.minute, ftMap.second, ftMap.millisecond)
                        .getTime());
                });

            });

            describe('with [1] test value', function () {

                it('should return right date ', function () {

                    ftMap = WINDOWS_FILE_TIME_ARRAY[1];
                    largeInteger = new LargeInteger(ftMap.ft);

                    expect(largeInteger.getAsDate().getFullYear()).toBe(ftMap.year);
                    expect(largeInteger.getAsDate().getMonth()).toBe(ftMap.month);
                    expect(largeInteger.getAsDate().getDate()).toBe(ftMap.day);
                    expect(largeInteger.getAsDate().getHours()).toBe(ftMap.hour);
                    expect(largeInteger.getAsDate().getMinutes()).toBe(ftMap.minute);
                    expect(largeInteger.getAsDate().getSeconds()).toBe(ftMap.second);
                    expect(largeInteger.getAsDate().getMilliseconds()).toBe(ftMap.millisecond);
                    expect(largeInteger.getAsDate().getTime()).toBe(new Date(ftMap.year, ftMap.month,
                        ftMap.day, ftMap.hour, ftMap.minute, ftMap.second, ftMap.millisecond)
                        .getTime());
                });

            });

            describe('with [2] test value', function () {

                it('should return right date ', function () {

                    ftMap = WINDOWS_FILE_TIME_ARRAY[2];
                    largeInteger = new LargeInteger(ftMap.ft);

                    expect(largeInteger.getAsDate().getFullYear()).toBe(ftMap.year);
                    expect(largeInteger.getAsDate().getMonth()).toBe(ftMap.month);
                    expect(largeInteger.getAsDate().getDate()).toBe(ftMap.day);
                    expect(largeInteger.getAsDate().getHours()).toBe(ftMap.hour);
                    expect(largeInteger.getAsDate().getMinutes()).toBe(ftMap.minute);
                    expect(largeInteger.getAsDate().getSeconds()).toBe(ftMap.second);
                    expect(largeInteger.getAsDate().getMilliseconds()).toBe(ftMap.millisecond);
                    expect(largeInteger.getAsDate().getTime()).toBe(new Date(ftMap.year, ftMap.month,
                        ftMap.day, ftMap.hour, ftMap.minute, ftMap.second, ftMap.millisecond)
                        .getTime());
                });

            });

        });

        describe('then instantiated', function () {

            describe('with [0] test date', function () {

                it('should contains right value ', function () {

                    ftMap = WINDOWS_FILE_TIME_ARRAY[0];
                    largeInteger = new LargeInteger(new Date(ftMap.year, ftMap.month, ftMap.day,
                        ftMap.hour, ftMap.minute, ftMap.second, ftMap.millisecond));

                    expect(largeInteger.toString()).toBe(ftMap.ft);
                });

            });

            describe('with [1] test date', function () {

                it('should contains right value ', function () {

                    ftMap = WINDOWS_FILE_TIME_ARRAY[1];
                    largeInteger = new LargeInteger(new Date(ftMap.year, ftMap.month, ftMap.day,
                        ftMap.hour, ftMap.minute, ftMap.second, ftMap.millisecond));

                    expect(largeInteger.toString()).toBe(ftMap.ft);
                });

            });

            describe('with [2] test date', function () {

                it('should contains right value ', function () {

                    ftMap = WINDOWS_FILE_TIME_ARRAY[2];
                    largeInteger = new LargeInteger(new Date(ftMap.year, ftMap.month, ftMap.day,
                        ftMap.hour, ftMap.minute, ftMap.second, ftMap.millisecond));

                    expect(largeInteger.toString()).toBe(ftMap.ft);
                });

            });


        });

        describe('compareTo', function () {

            describe ('on instance with value' , function () {

                it('should return positive value if instance more then', function () {
                    var instance = new LargeInteger('100000000');

                    expect(instance.compareTo('100') > 0).toBe(true);
                    expect(instance.compareTo(LargeInteger.UNSPECIFIED) > 0).toBe(true);
                    expect(instance.compareTo(new LargeInteger('100')) > 0).toBe(true);

                });

                it('should return negative value if instance less then', function () {
                    var instance = new LargeInteger('100000000');

                    expect(instance.compareTo('200000000') < 0).toBe(true);
                    expect(instance.compareTo(LargeInteger.NEVER) < 0).toBe(true);
                    expect(instance.compareTo(new LargeInteger('200000000')) < 0).toBe(true);
                });

                it('should return zero value on equals', function () {
                    var instance = new LargeInteger('100000000');

                    expect(instance.compareTo('100000000') == 0).toBe(true);
                    expect(instance.compareTo(LargeInteger.UNSPECIFIED) == 0).toBe(false);
                    expect(instance.compareTo(new LargeInteger('100000000')) == 0).toBe(true);
                });
            });

            describe ('on instance with large value' , function () {

                var stringValue,
                    biggestStringValue,
                    lowStringValue,
                    instance;

                beforeEach(function () {
                    stringValue = '9223372036854775802';
                    biggestStringValue = '9223372036854775803';
                    lowStringValue = '9223372036854775801';
                    instance = new LargeInteger(stringValue);
                });

                it('should return positive value if instance more then', function () {

                    expect(instance.compareTo('100') > 0).toBe(true);
                    expect(instance.compareTo(lowStringValue) > 0).toBe(true);
                    expect(instance.compareTo(LargeInteger.UNSPECIFIED) > 0).toBe(true);
                    expect(instance.compareTo(new LargeInteger('100')) > 0).toBe(true);

                });

                it('should return negative value if instance less then', function () {
                    expect(instance.compareTo(biggestStringValue) < 0).toBe(true);
                    expect(instance.compareTo(LargeInteger.NEVER) < 0).toBe(true);
                    expect(instance.compareTo(new LargeInteger(biggestStringValue)) < 0).toBe(true);

                });

                it('should return zero value on equals', function () {

                    expect(instance.compareTo(stringValue) == 0).toBe(true);
                    expect(instance.compareTo(new LargeInteger(stringValue)) == 0).toBe(true);
                });
            });

            describe ('on instance with negative value' , function () {

                it('should return positive value if instance more then', function () {
                    var instance = new LargeInteger('-100000000');

                    expect(instance.compareTo('-200000000') > 0).toBe(true);
                    expect(instance.compareTo(new LargeInteger('-200000000')) > 0).toBe(true);

                });

                it('should return negative value if instance less then', function () {
                    var instance = new LargeInteger('-100000000');

                    expect(instance.compareTo('-100') < 0).toBe(true);
                    expect(instance.compareTo('100') < 0).toBe(true);
                    expect(instance.compareTo(LargeInteger.NEVER) < 0).toBe(true);
                    expect(instance.compareTo(new LargeInteger('-100')) < 0).toBe(true);
                    expect(instance.compareTo(new LargeInteger('100')) < 0).toBe(true);
                });

                it('should return zero value on equals', function () {
                    var instance = new LargeInteger('-100000000');

                    expect(instance.compareTo('-100000000') == 0).toBe(true);
                    expect(instance.compareTo(LargeInteger.UNSPECIFIED) == 0).toBe(false);
                    expect(instance.compareTo(new LargeInteger('-100000000')) == 0).toBe(true);
                });
            });

        });
    });

    //
    //  directive
    //

    describe('directive', function ()
    {
        var defaultData;                //object with default data
        var $rootScope;                 //root scope object reference
        var $compile;                   //compile function reference
        var $templateCache              //templateCache reference
        var validTemplate;              //object with default data


        function createDirective(data, template) {
            // Setup scope state
            $rootScope.data = data || defaultData;

            // Create directive element
            var element = angular.element(template || validTemplate);

            // Create directive
            $compile(element)($rootScope);

            // Trigger watchers
            $rootScope.$apply();

            // Return
            return element;
        }

        //
        //  timestampEditor directive
        //

        describe('timestamp-editor directive', function () {

            var LargeInteger;
            var element;
            var outerLargeInteger;
            var $injector;

            var DEFAULT_TEMPLATE =
                '<timestamp-editor ng-model="largeInteger"></div>';

            beforeEach(function () {

                module('timestamp');

                // Provide any mocks needed
                module(function ($provide) {

                    /*LargeInteger = {
                        UNSPECIFIED: 'unspecifiedValue',
                        NEVER: 'neverValue'
                    };

                    $provide.value('LargeInteger', LargeInteger);*/

                    LargeInteger = function(value) {
                        this.toString = function () {
                            return value;
                        };
                    }

                    LargeInteger.UNSPECIFIED= 'unspecifiedValue';

                    LargeInteger.NEVER= 'neverValue';

                    $provide.factory('LargeInteger', function () {
                        return LargeInteger;
                    });

                });

                // Inject in angular and module constructs
                inject(function (_$rootScope_, _$compile_, _$templateCache_) {
                    $rootScope = _$rootScope_.$new();
                    $compile = _$compile_;
                    $templateCache = _$templateCache_;
                });

                $templateCache.put('../src/timestamp-editor.tpl.html',
                    '<div class="radio"> \
                        <label>\
                            <input type="radio" ng-model="radioButtonsValue" value="{{UNSPECIFIED}}" ng-change="setValue(UNSPECIFIED)"> Unspecified\
                            </label>\
                        </div>\
                        <div class="radio">\
                            <label>\
                                <input type="radio" ng-model="radioButtonsValue" value="{{NEVER}}" ng-change="setValue(NEVER)"> Never\
                                </label>\
                            </div>\
                            <div class="radio">\
                                <label>\
                                    <input type="radio" ng-model="radioButtonsValue" value="{{dateRadioButtonValue}}"\
                                    ng-change="setValue(datepickerDate)"/>\
                                    <input type="text" datepicker-popup="dd-MMMM-yyyy" ng-model="datepickerDate"\
                                    close-text="Close" ng-disabled="radioButtonsValue != dateRadioButtonValue"/>\
                                </label>\
                            </div>'
                    );

            });

            beforeEach(function () {
                // Reset template
                validTemplate = DEFAULT_TEMPLATE;

                // Reset data each time
                defaultData = {};

            });

            describe("when outer variable changed", function () {

                beforeEach(function () {
                    // Reset template
                    validTemplate = DEFAULT_TEMPLATE;
                    // Reset data each time
                    defaultData = {};

                    $rootScope.largeInteger = {

                        isUnspecified: function () {
                            return true;
                        },
                        isNever: function () {
                            return false;
                        },
                        getAsDate: function () {
                        },
                        getValue: function () {
                        }
                    }

                });

                describe("to Date represented LargeInteger", function () {

                    it("should process $render ", function () {

                        element = createDirective();

                        var newLargeInteger = {

                            isUnspecified: function () {
                            },
                            isNever: function () {
                            },
                            getAsDate: function () {
                            },
                            toString: function () {
                            }

                        };

                        spyOn(newLargeInteger, 'isUnspecified').andReturn(false);
                        spyOn(newLargeInteger, 'isNever').andReturn(false);
                        spyOn(newLargeInteger, 'getAsDate').andReturn('fakeDate');
                        spyOn(newLargeInteger, 'toString').andReturn('fakeValue');

                        $rootScope.largeInteger = newLargeInteger;
                        $rootScope.$apply();

                        expect(newLargeInteger.isUnspecified).toHaveBeenCalled();
                        expect(newLargeInteger.isNever).toHaveBeenCalled();
                        expect(newLargeInteger.getAsDate).toHaveBeenCalled();
                        expect(newLargeInteger.toString).toHaveBeenCalled();
                        expect(element.isolateScope().dateRadioButtonValue).toBe('fakeValue');
                        expect(element.isolateScope().radioButtonsValue).toBe('fakeValue');
                        expect(element.isolateScope().datepickerDate).toBe('fakeDate');

                    });

                });


                describe("to Date NOT represented LargeInteger", function () {

                    it("should process $render ", function () {

                        element = createDirective();

                        var newLargeInteger = {

                            isUnspecified: function () {
                            },
                            isNever: function () {
                            },
                            getAsDate: function () {
                            },
                            toString: function () {
                            }

                        };

                        spyOn(newLargeInteger, 'isUnspecified').andReturn(false);
                        spyOn(newLargeInteger, 'isNever').andReturn(true);
                        spyOn(newLargeInteger, 'getAsDate').andReturn('fakeDate');
                        spyOn(newLargeInteger, 'toString').andReturn('fakeValue');

                        $rootScope.largeInteger = newLargeInteger;
                        $rootScope.$apply();

                        expect(newLargeInteger.isUnspecified).toHaveBeenCalled();
                        expect(newLargeInteger.isNever).toHaveBeenCalled();
                        expect(newLargeInteger.getAsDate).not.toHaveBeenCalled();
                        expect(newLargeInteger.toString).toHaveBeenCalled();
                        expect(element.isolateScope().dateRadioButtonValue).not.toBe('fakeValue');
                        expect(element.isolateScope().radioButtonsValue).toBe('fakeValue');
                        expect(element.isolateScope().datepickerDate).not.toBe('fakeDate');

                    });

                });

            });

            describe("when datepicker date changed", function () {

                beforeEach(function () {
                    // Reset template
                    validTemplate = DEFAULT_TEMPLATE;
                    // Reset data each time
                    defaultData = {};

                    $rootScope.largeInteger = {

                        isUnspecified: function () {
                            return true;
                        },
                        isNever: function () {
                            return false;
                        },
                        getAsDate: function () {
                        },
                        toString: function () {
                        }
                    }

                });


                it("should call scope.SetValue with updated date", function () {
                    element = createDirective();

                    spyOn(element.isolateScope(), 'setValue');

                    var newDate = {
                        setHours : function () {},
                        setMinutes : function () {},
                        setSeconds : function () {},
                        setMilliseconds : function () {}
                    }

                    spyOn(newDate, 'setHours');
                    spyOn(newDate, 'setMinutes');
                    spyOn(newDate, 'setSeconds');
                    spyOn(newDate, 'setMilliseconds');

                    element.isolateScope().datepickerDate = newDate;
                    $rootScope.$apply();

                    expect(newDate.setHours).toHaveBeenCalled();
                    expect(newDate.setMinutes).toHaveBeenCalled();
                    expect(newDate.setSeconds).toHaveBeenCalled();
                    expect(newDate.setMilliseconds).toHaveBeenCalled();

                    expect(element.isolateScope().setValue).toHaveBeenCalledWith(newDate);

                });

            });

            describe("when scope setValue called", function () {

                beforeEach(function () {
                    // Reset template
                    validTemplate = DEFAULT_TEMPLATE;
                    // Reset data each time
                    defaultData = {};

                    $rootScope.largeInteger = {

                        isUnspecified: function () {
                            return true;
                        },
                        isNever: function () {
                            return false;
                        },
                        getAsDate: function () {
                        },
                        toString: function () {
                        }
                    }

                });

                describe("with Date represented value", function () {

                    it("should update outer variable", function () {
                        element = createDirective();

                        LargeInteger.prototype.isUnspecified = function () {
                            return false;
                        }

                        LargeInteger.prototype.isNever = function () {
                            return false;
                        }


                        element.isolateScope().setValue('someNewValue');
                        $rootScope.$apply();

                        expect(element.isolateScope().radioButtonsValue).toBe('someNewValue');
                        expect(element.isolateScope().dateRadioButtonValue).toBe('someNewValue');
                        expect($rootScope.largeInteger.toString()).toBe('someNewValue');
                    });

                });
            });

        });

        //
        //  timestampMoreThen directive
        //

        describe('timestamp-more-then directive', function() {

            var modelCtrl, modelValue, formElement;
            var LargeInteger;

            var DEFAULT_TEMPLATE =
                '<form name="testForm">' +
                    '<timestamp-input name="testInput" ' +
                    'ng-model="data.largeInteger" ' +
                    'timestamp-more-then="data.validateValue">' +
                    '</form>';

            beforeEach(function () {

                module('timestamp');

                // Provide any mocks needed
                module(function ($provide) {

                });

                // Inject in angular and module constructs
                inject(function (_$rootScope_, _$compile_, _$templateCache_, _LargeInteger_) {
                    $rootScope = _$rootScope_.$new();
                    $compile = _$compile_;
                    $templateCache = _$templateCache_;
                    LargeInteger = _LargeInteger_;
                });

                $templateCache.put('../src/timestamp-editor.tpl.html',
                    '<div class="radio"> \
                        <label>\
                            <input type="radio" ng-model="radioButtonsValue" value="{{UNSPECIFIED}}" ng-change="setValue(UNSPECIFIED)"> Unspecified\
                            </label>\
                        </div>\
                        <div class="radio">\
                            <label>\
                                <input type="radio" ng-model="radioButtonsValue" value="{{NEVER}}" ng-change="setValue(NEVER)"> Never\
                                </label>\
                            </div>\
                            <div class="radio">\
                                <label>\
                                    <input type="radio" ng-model="radioButtonsValue" value="{{dateRadioButtonValue}}"\
                                    ng-change="setValue(datepickerDate)"/>\
                                    <input type="text" datepicker-popup="dd-MMMM-yyyy" ng-model="datepickerDate"\
                                    close-text="Close" ng-disabled="radioButtonsValue != dateRadioButtonValue"/>\
                                </label>\
                            </div>'
                );

                // Reset template
                validTemplate = DEFAULT_TEMPLATE;

                // Reset data each time
                defaultData = {
                    largeInteger : new LargeInteger(WINDOWS_FILE_TIME_ARRAY[0].ft),  //Middle value
                    validateValue : LargeInteger.UNSPECIFIED                       //Less then value
                };

            });

            it('should be valid initially', function() {

                formElement = createDirective();
                $rootScope.$apply();

                modelCtrl = $rootScope.testForm.testInput;

                expect(modelCtrl.$valid).toBeTruthy();
            });

            describe('model value changes', function() {

                beforeEach(function () {
                    formElement = createDirective();
                    $rootScope.$apply();
                    modelCtrl = $rootScope.testForm.testInput;
                });


                it('should be invalid if the model changes to invalid', function() {
                    $rootScope.data.largeInteger = new LargeInteger(LargeInteger.UNSPECIFIED);
                    $rootScope.$digest();
                    expect(modelCtrl.$valid).toBeFalsy();
                });

                it('should be invalid if the validate value changes', function() {
                    $rootScope.data.validateValue = LargeInteger.NEVER;
                    $rootScope.$digest();
                    expect(modelCtrl.$valid).toBeFalsy();
                });

                it('should be valid if the modelValue changes to valid', function() {
                    $rootScope.data.largeInteger = new LargeInteger(LargeInteger.NEVER)
                    $rootScope.$digest();
                    expect(modelCtrl.$valid).toBeTruthy();

                    $rootScope.data.validateValue = LargeInteger.UNSPECIFIED;
                    $rootScope.$digest();
                    expect(modelCtrl.$valid).toBeTruthy();

                });
            });
        });

        //
        //  largeIntegerLessThen directive
        //

        describe('timestamp-less-then directive', function() {

            var modelCtrl, modelValue, formElement;
            var LargeInteger;

            var DEFAULT_TEMPLATE =
                '<form name="testForm">' +
                    '<timestamp-input name="testInput" ' +
                    'ng-model="data.largeInteger" ' +
                    'timestamp-less-then="data.validateValue">' +
                    '</form>';

            beforeEach(function () {

                module('timestamp');

                // Provide any mocks needed
                module(function ($provide) {

                });

                // Inject in angular and module constructs
                inject(function (_$rootScope_, _$compile_, _$templateCache_, _LargeInteger_) {
                    $rootScope = _$rootScope_.$new();
                    $compile = _$compile_;
                    $templateCache = _$templateCache_;
                    LargeInteger = _LargeInteger_;
                });

                $templateCache.put('../src/timestamp-editor.tpl.html',
                    '<div class="radio"> \
                        <label>\
                            <input type="radio" ng-model="radioButtonsValue" value="{{UNSPECIFIED}}" ng-change="setValue(UNSPECIFIED)"> Unspecified\
                            </label>\
                        </div>\
                        <div class="radio">\
                            <label>\
                                <input type="radio" ng-model="radioButtonsValue" value="{{NEVER}}" ng-change="setValue(NEVER)"> Never\
                                </label>\
                            </div>\
                            <div class="radio">\
                                <label>\
                                    <input type="radio" ng-model="radioButtonsValue" value="{{dateRadioButtonValue}}"\
                                    ng-change="setValue(datepickerDate)"/>\
                                    <input type="text" datepicker-popup="dd-MMMM-yyyy" ng-model="datepickerDate"\
                                    close-text="Close" ng-disabled="radioButtonsValue != dateRadioButtonValue"/>\
                                </label>\
                            </div>'
                );

                // Reset template
                validTemplate = DEFAULT_TEMPLATE;

                // Reset data each time
                defaultData = {
                    largeInteger : new LargeInteger(WINDOWS_FILE_TIME_ARRAY[0].ft),  //Middle value
                    validateValue : new LargeInteger(WINDOWS_FILE_TIME_ARRAY[2].ft)  //More then value
                };

            });

            it('should be valid initially', function() {

                formElement = createDirective();
                $rootScope.$apply();

                modelCtrl = $rootScope.testForm.testInput;

                expect(modelCtrl.$valid).toBeTruthy();
            });

            describe('model value changes', function() {

                beforeEach(function () {
                    formElement = createDirective();
                    $rootScope.$apply();
                    modelCtrl = $rootScope.testForm.testInput;
                });


                it('should be invalid if the model changes to invalid', function() {
                    $rootScope.data.largeInteger = new LargeInteger(LargeInteger.NEVER);
                    $rootScope.$digest();
                    expect(modelCtrl.$valid).toBeFalsy();
                });

                it('should be invalid if the validate value changes', function() {
                    $rootScope.data.validateValue = LargeInteger.UNSPECIFIED;
                    $rootScope.$digest();
                    expect(modelCtrl.$valid).toBeFalsy();
                });

                it('should be valid if the modelValue changes to valid', function() {
                    $rootScope.data.largeInteger = new LargeInteger(LargeInteger.UNSPECIFIED)
                    $rootScope.$digest();
                    expect(modelCtrl.$valid).toBeTruthy();

                    $rootScope.data.validateValue = LargeInteger.NEVER;
                    $rootScope.$digest();
                    expect(modelCtrl.$valid).toBeTruthy();

                });
            });
        });

    });
});

