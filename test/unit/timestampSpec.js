'use strict';

/* jasmine specs for myApp.components.resetPassword module */

describe('timestamp', function () {

    //
    //  Timestamp factory
    //

    describe('Timestamp factory', function () {

        var Timestamp;
        var timestamp;
        var WINDOWS_FILE_TIME_ARRAY = [
            {
                ft: '120513686052310000',
                hour: 12,
                minute: 23,
                second: 25,
                millisecond: 231,
                year: 1982,
                month: 10,
                day: 23
            },
            {
                ft: '41341461012110000',
                hour: 23,
                minute: 55,
                second: 1,
                millisecond: 211,
                year: 1732,
                month: 0,
                day: 3
            },
            {
                ft: '167569269012110000',
                hour: 23,
                minute: 55,
                second: 1,
                millisecond: 211,
                year: 2132,
                month: 0,
                day: 3
            }
        ];

        var ftMap;

        beforeEach(function () {

            module('timestamp');

            // Provide any mocks needed
            module(function ($provide) {

            });

            inject(function (_Timestamp_) {
                Timestamp = _Timestamp_;
            });
        });

        describe('then created', function () {

            describe('with "0" value', function () {

                it('should be "UNSPECIFIED"', function () {

                    timestamp = new Timestamp('0');

                    expect(timestamp.value).toBe('0');
                    expect(timestamp.toString()).toBe('UNSPECIFIED');
                    expect(timestamp.isUnspecified()).toBe(true);
                    expect(timestamp.isNever()).toBe(false);
                    expect(timestamp.isDate()).toBe(false);
                    expect(typeof timestamp.toDate()).toBe('undefined');

                });

            });

            describe('with "9223372036854775807" value', function () {

                it('should be "NEVER"', function () {

                    timestamp = new Timestamp('9223372036854775807');

                    expect(timestamp.value).toBe('9223372036854775807');
                    expect(timestamp.toString()).toBe('NEVER');
                    expect(timestamp.isUnspecified()).toBe(false);
                    expect(timestamp.isNever()).toBe(true);
                    expect(timestamp.isDate()).toBe(false);
                    expect(typeof timestamp.toDate()).toBe('undefined');

                });

            });

            describe('with some other value value', function () {

                it('should has valid value', function () {

                    timestamp = new Timestamp('100000000000000000');
                    var dateString = timestamp.toDate().toString();

                    expect(timestamp.value).toBe('100000000000000000');
                    expect(timestamp.toString()).toBe(dateString);
                    expect(timestamp.isUnspecified()).toBe(false);
                    expect(timestamp.isNever()).toBe(false);
                    expect(timestamp.isDate()).toBe(true);
                    expect(typeof timestamp.toDate()).not.toBe('undefined');

                });

            });

        });

        describe('then toDate() called', function () {

            describe('with [0] test value', function () {

                it('should return right date ', function () {

                    ftMap = WINDOWS_FILE_TIME_ARRAY[0];
                    timestamp = new Timestamp(ftMap.ft);

                    expect(timestamp.isDate()).toBe(true);
                    expect(timestamp.toDate().getFullYear()).toBe(ftMap.year);
                    expect(timestamp.toDate().getMonth()).toBe(ftMap.month);
                    expect(timestamp.toDate().getDate()).toBe(ftMap.day);
                    expect(timestamp.toDate().getHours()).toBe(ftMap.hour);
                    expect(timestamp.toDate().getMinutes()).toBe(ftMap.minute);
                    expect(timestamp.toDate().getSeconds()).toBe(ftMap.second);
                    expect(timestamp.toDate().getMilliseconds()).toBe(ftMap.millisecond);
                    expect(timestamp.toDate().getTime()).toBe(new Date(ftMap.year, ftMap.month, ftMap.day, ftMap.hour, ftMap.minute, ftMap.second, ftMap.millisecond).getTime());
                });

            });

            describe('with [1] test value', function () {

                it('should return right date ', function () {

                    ftMap = WINDOWS_FILE_TIME_ARRAY[1];
                    timestamp = new Timestamp(ftMap.ft);

                    expect(timestamp.isDate()).toBe(true);
                    expect(timestamp.toDate().getFullYear()).toBe(ftMap.year);
                    expect(timestamp.toDate().getMonth()).toBe(ftMap.month);
                    expect(timestamp.toDate().getDate()).toBe(ftMap.day);
                    expect(timestamp.toDate().getHours()).toBe(ftMap.hour);
                    expect(timestamp.toDate().getMinutes()).toBe(ftMap.minute);
                    expect(timestamp.toDate().getSeconds()).toBe(ftMap.second);
                    expect(timestamp.toDate().getMilliseconds()).toBe(ftMap.millisecond);
                    expect(timestamp.toDate().getTime()).toBe(new Date(ftMap.year, ftMap.month, ftMap.day, ftMap.hour, ftMap.minute, ftMap.second, ftMap.millisecond).getTime());
                });

            });

            describe('with [2] test value', function () {

                it('should return right date ', function () {

                    ftMap = WINDOWS_FILE_TIME_ARRAY[2];
                    timestamp = new Timestamp(ftMap.ft);

                    expect(timestamp.isDate()).toBe(true);
                    expect(timestamp.toDate().getFullYear()).toBe(ftMap.year);
                    expect(timestamp.toDate().getMonth()).toBe(ftMap.month);
                    expect(timestamp.toDate().getDate()).toBe(ftMap.day);
                    expect(timestamp.toDate().getHours()).toBe(ftMap.hour);
                    expect(timestamp.toDate().getMinutes()).toBe(ftMap.minute);
                    expect(timestamp.toDate().getSeconds()).toBe(ftMap.second);
                    expect(timestamp.toDate().getMilliseconds()).toBe(ftMap.millisecond);
                    expect(timestamp.toDate().getTime()).toBe(new Date(ftMap.year, ftMap.month, ftMap.day, ftMap.hour, ftMap.minute, ftMap.second, ftMap.millisecond).getTime());
                });

            });

        });

        describe('then setFromDate() called', function () {

            describe('with [0] test date', function () {

                it('should contains right value ', function () {

                    ftMap = WINDOWS_FILE_TIME_ARRAY[0];
                    timestamp = new Timestamp('0');
                    timestamp.setFromDate(new Date(ftMap.year, ftMap.month, ftMap.day, ftMap.hour, ftMap.minute, ftMap.second, ftMap.millisecond));

                    expect(timestamp.isDate()).toBe(true);
                    expect(timestamp.value).toBe(ftMap.ft);
                });

            });

            describe('with [1] test date', function () {

                it('should contains right value ', function () {

                    ftMap = WINDOWS_FILE_TIME_ARRAY[1];
                    timestamp = new Timestamp('0');
                    timestamp.setFromDate(new Date(ftMap.year, ftMap.month, ftMap.day, ftMap.hour, ftMap.minute, ftMap.second, ftMap.millisecond));

                    expect(timestamp.isDate()).toBe(true);
                    expect(timestamp.value).toBe(ftMap.ft);
                });

            });

            describe('with [2] test date', function () {

                it('should contains right value ', function () {

                    ftMap = WINDOWS_FILE_TIME_ARRAY[2];
                    timestamp = new Timestamp('0');
                    timestamp.setFromDate(new Date(ftMap.year, ftMap.month, ftMap.day, ftMap.hour, ftMap.minute, ftMap.second, ftMap.millisecond));

                    expect(timestamp.isDate()).toBe(true);
                    expect(timestamp.value).toBe(ftMap.ft);
                });

            });


        });

    });

    //
    //  resetPassword directive
    //

    describe('timestamp-input directive', function () {

        var Timestamp;
        var element;
        var outerTimestamp
        var defaultData;                //object with default data

        var $rootScope;                 //root scope object reference
        var $compile;                   //compile function reference
        var $templateCache              //templateCache reference
        var validTemplate;              //object with default data

        var mockNotificationService;    //notification service link

        var $q;
        var passwordSpyHelper;
        var Password;
        var notifications;
        var $injector;

        var DEFAULT_TEMPLATE =
            '<div timestamp-input="timestamp"></div>';

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

        beforeEach(function () {

            module('timestamp');

            // Provide any mocks needed
            module(function ($provide) {

                Timestamp = {
                    UNSPECIFIED: 'unspecifiedValue',
                    NEVER: 'neverValue'
                };

                $provide.value('Timestamp', Timestamp);

            });

            // Inject in angular and module constructs
            inject(function (_$rootScope_, _$compile_, _$templateCache_, _$q_) {
                $rootScope = _$rootScope_.$new();
                $compile = _$compile_;
                $templateCache = _$templateCache_;
            });

            $templateCache.put('../src/timestamp-input.tpl.html', '<div class="radio"><label><input type="radio" ng-model="timestamp.value" value="{{UNSPECIFIED}}"> Unspecified</label></div><div class="radio"><label><input type="radio" ng-model="timestamp.value" value="{{NEVER}}"> Never</label></div><div class="radio"><label><input type="radio" ng-model="timestamp.value" value="{{valueToCompare}}"ng-change="updateTimestamp(datepickerDate)"/><input type="text" datepicker-popup="dd-MMMM-yyyy" ng-model="datepickerDate"close-text="Close" ng-disabled="timestamp.value != valueToCompare"/></label></div>');

        });

        beforeEach(function () {
            // Reset template
            validTemplate = DEFAULT_TEMPLATE;

            // Reset data each time
            defaultData = {};

        });

        describe("when outer model changed", function () {

            beforeEach(function () {
                // Reset template
                validTemplate = DEFAULT_TEMPLATE;
                // Reset data each time
                defaultData = {};

                outerTimestamp = {
                    value: 'someValue',

                    setFromDate: function (data) {
                    },

                    toDate: function () {
                    }
                };

                $rootScope.timestamp = outerTimestamp;

            });


            describe("to 'Newer'", function () {

                it("should not change datepicker Date ", function () {
                    element = createDirective();

                    spyOn(outerTimestamp, 'toDate');

                    $rootScope.timestamp.value = 'neverValue';
                    $rootScope.$apply();

                    expect(outerTimestamp.toDate).not.toHaveBeenCalled();

                });

            });

            describe("to 'Unspecified'", function () {

                it("should has new inner value ", function () {

                    element = createDirective();

                    spyOn(outerTimestamp, 'toDate');

                    $rootScope.timestamp.value = 'unspecifiedValue';
                    $rootScope.$apply();

                    expect(outerTimestamp.toDate).not.toHaveBeenCalled();

                });

            });

            describe("to some other value ", function () {

                beforeEach(function () {

                    element = createDirective();

                    spyOn(outerTimestamp, 'toDate');

                    spyOn(outerTimestamp, 'setFromDate');

                    $rootScope.timestamp.value = 'someNewValue';
                    $rootScope.$apply();
                });


                it("should has new inner value ", function () {

                    expect(element.isolateScope().valueToCompare).toBe('someNewValue');

                });

                it("should change datepicker Date ", function () {

                    expect(outerTimestamp.toDate).toHaveBeenCalled();

                });

                it("should not change timestamp twice ", function () {

                    expect(outerTimestamp.setFromDate).not.toHaveBeenCalled();

                });

            });

        });

        describe("when datepicker date changed", function () {

            beforeEach(function () {
                // Reset template
                validTemplate = DEFAULT_TEMPLATE;
                // Reset data each time
                defaultData = {};

                outerTimestamp = {
                    value: 'someValue',

                    setFromDate: function (data) {
                    },

                    toDate: function () {
                    }
                };

                $rootScope.timestamp = outerTimestamp;

            });


            it("should update timestamp with updated date", function () {
                element = createDirective();

                spyOn(outerTimestamp, 'setFromDate');

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

                expect(outerTimestamp.setFromDate).toHaveBeenCalledWith(newDate);


            });

        });

    });


});

