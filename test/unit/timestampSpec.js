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

    xdescribe('timestamp-input directive', function () {

        var $rootScope;                 //root scope object reference
        var $compile;                   //compile function reference
        var $templateCache              //templateCache reference
        var validTemplate;              //object with default data
        var defaultData;                //object with default data
        var mockNotificationService;    //notification service link

        var $q;
        var element;
        var passwordSpyHelper;
        var Password;
        var notifications;
        var $injector;

        var DEFAULT_TEMPLATE =
            '<div reset-password="password" custom-data="customData"></div>';

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

            module('myApp.components.resetPassword');

            // Provide any mocks needed
            module(function ($provide) {

                passwordSpyHelper = {

                    $update: function (customData) {
                    },

                    $generate: function () {
                    }
                };

                Password = function (configuration) {
                    angular.extend(this, configuration);

                    this.$update = passwordSpyHelper.$update;

                    this.$generate = passwordSpyHelper.$generate;

                };

                notifications = {
                    add: function () {
                    }
                };

                /*$injector = {
                 has: function () {
                 return true;
                 },
                 get: function () {
                 return notifications;
                 }
                 };*/

                $provide.value('Password', Password);
                $provide.value('Password', Password);
                $provide.value('notificationsStorage', notifications);

            });

            // Inject in angular and module constructs
            inject(function (_$rootScope_, _$compile_, _$templateCache_, _$q_) {
                $rootScope = _$rootScope_.$new();
                $compile = _$compile_;
                $q = _$q_;
                $templateCache = _$templateCache_;
            });

            $templateCache.put('templates/reset-password/reset-password.tpl.html', '');

        });

        beforeEach(function () {
            // Reset template
            validTemplate = DEFAULT_TEMPLATE;

            // Reset data each time
            defaultData = {};

        });

        describe("when created", function () {

            it("should has right scope ", function () {

                var someData = {
                    someProp: 'someVal'
                };

                $rootScope.password = 'someText';
                $rootScope.customData = someData;

                element = createDirective();

                $rootScope.$apply();

                expect(element.isolateScope().showPasswords).toBe(false);

                expect(element.isolateScope().disableInputs).toBe(false);

                expect(element.isolateScope().password.text).toBe('someText');

                expect(element.isolateScope().password.confirmation).toBe('someText');

                expect(element.isolateScope().customData).toBe(someData);

            });

        });

        describe("when scope applyChanges called", function () {

            it("should call to Password update", function () {

                spyOn(passwordSpyHelper, '$update').andReturn({then: function () {
                }});

                $rootScope.customData = 'customData';

                element = createDirective();

                $rootScope.$apply();

                element.isolateScope().applyChanges();

                expect(element.isolateScope().disableInputs).toBe(true);

                return expect(passwordSpyHelper.$update).toHaveBeenCalledWith('customData');

            });

            describe("and resolved", function () {

                var defered;
                var theForm;

                beforeEach(function () {
                    //spyOn(form, '$setPristine');

                    theForm = {
                        $setPristine: function () {
                        }
                    }

                    defered = $q.defer();

                    spyOn(theForm, '$setPristine');

                    spyOn(passwordSpyHelper, '$update').andReturn(defered.promise);

                    spyOn(notifications, 'add');

                    element = createDirective();

                    element.isolateScope().form = theForm;

                    element.isolateScope().applyChanges();
                    defered.resolve({});
                    $rootScope.$apply();

                });

                it("should call to form.$setPristine", function () {
                    return expect(theForm.$setPristine)
                        .toHaveBeenCalled();
                });

                it("should update inputs", function () {
                    return expect(element.isolateScope().disableInputs).toBe(false);
                });

                it("should call to notifications add method", function () {
                    return expect(notifications.add)
                        .toHaveBeenCalledWith('success', 'Password is changed.');
                });

            });

            describe("and rejected", function () {

                var defered;
                var theForm;

                beforeEach(function () {
                    theForm = {
                        $setPristine: function () {
                        }
                    }

                    defered = $q.defer();

                    spyOn(passwordSpyHelper, '$update').andReturn(defered.promise);

                    spyOn(notifications, 'add');

                    element = createDirective();

                    element.isolateScope().form = theForm;

                    element.isolateScope().applyChanges();
                    defered.reject({});
                    $rootScope.$apply();

                });

                it("should update inputs", function () {
                    return expect(element.isolateScope().disableInputs).toBe(false);
                });

                it("should call to notifications add method", function () {
                    return expect(notifications.add)
                        .toHaveBeenCalledWith('danger', 'Server can not reset password.');
                });

            });

        });

        describe("when scope generatePassword called", function () {

            it("should call to Password generate", function () {

                spyOn(passwordSpyHelper, '$generate').andReturn({then: function () {
                }});

                $rootScope.customData = 'customData';

                $rootScope.$apply();

                element = createDirective();

                element.isolateScope().generatePassword();

                expect(element.isolateScope().disableInputs).toBe(true);
                expect(element.isolateScope().showPasswords).toBe(false);

                return expect(passwordSpyHelper.$generate).toHaveBeenCalled();

            });

            describe("and resolved", function () {

                var defered;
                var theForm;

                beforeEach(function () {

                    defered = $q.defer();

                    spyOn(passwordSpyHelper, '$generate').andReturn(defered.promise);

                    spyOn(notifications, 'add');

                    element = createDirective();

                    element.isolateScope().generatePassword();
                    defered.resolve({});
                    $rootScope.$apply();

                });

                it("should update inputs", function () {
                    return expect(element.isolateScope().disableInputs).toBe(false);
                    return expect(element.isolateScope().showPasswords).toBe(true);
                });

                it("should call to notifications add method", function () {
                    return expect(notifications.add)
                        .toHaveBeenCalledWith('success', 'New password generated.');
                });

            });

            describe("and rejected", function () {

                var defered;
                var theForm;

                beforeEach(function () {

                    defered = $q.defer();

                    spyOn(passwordSpyHelper, '$generate').andReturn(defered.promise);

                    spyOn(notifications, 'add');

                    element = createDirective();

                    element.isolateScope().generatePassword();
                    defered.reject({});
                    $rootScope.$apply();

                });

                it("should update inputs", function () {
                    return expect(element.isolateScope().disableInputs).toBe(false);
                });

                it("should call to notifications add method", function () {
                    return expect(notifications.add)
                        .toHaveBeenCalledWith('danger', 'Server can not generate password.');
                });

            });

        });

    });


});

