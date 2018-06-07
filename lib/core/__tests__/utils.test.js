"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable: no-any */
var utils = require("../utils");
describe('Utilities', function () {
    it('filenamify()', function () {
        var table = [
            ['foo bar baz', 'foo-bar-baz'],
            ['foo    bar', 'foo-bar'],
            ['foo_bar/baz', 'foo_barbaz'],
        ];
        for (var _i = 0, table_1 = table; _i < table_1.length; _i++) {
            var _a = table_1[_i], s = _a[0], o = _a[1];
            expect(utils.filenamify(s)).toBe(o);
        }
    });
    it('permutationKnobs()', function () {
        var table = [
            [
                {},
                [],
            ],
            [
                {
                    bool: [
                        true,
                        false,
                    ],
                    label: [
                        'foo',
                        'bar',
                    ],
                    num: [
                        10,
                        20,
                    ],
                },
                [
                    { bool: true, label: 'foo', num: 10 },
                    { bool: false, label: 'foo', num: 10 },
                    { bool: true, label: 'bar', num: 10 },
                    { bool: false, label: 'bar', num: 10 },
                    { bool: true, label: 'foo', num: 20 },
                    { bool: false, label: 'foo', num: 20 },
                    { bool: true, label: 'bar', num: 20 },
                    { bool: false, label: 'bar', num: 20 },
                ],
            ],
        ];
        for (var _i = 0, table_2 = table; _i < table_2.length; _i++) {
            var _a = table_2[_i], v = _a[0], o = _a[1];
            expect(utils.permutationKnobs(v)).toEqual(o);
        }
    });
    it('knobsQueryObject()', function () {
        var table = [
            [
                {},
                {},
            ],
            [
                {
                    label: 'text',
                    number: 100,
                    bool: true,
                },
                {
                    'knob-label': 'text',
                    'knob-number': 100,
                    'knob-bool': true,
                },
            ],
        ];
        for (var _i = 0, table_3 = table; _i < table_3.length; _i++) {
            var _a = table_3[_i], v = _a[0], o = _a[1];
            expect(utils.knobsQueryObject(v)).toEqual(o);
        }
    });
    it('viewport2string()', function () {
        var vp = {
            width: 900,
            height: 400,
            isMobile: false,
            hasTouch: false,
            isLandscape: false,
            deviceScaleFactor: 1,
        };
        var table = [
            [
                __assign({}, vp),
                '900x400',
            ],
            [
                __assign({}, vp, { width: 100, height: 200 }),
                '100x200',
            ],
            [
                __assign({}, vp, { isMobile: true, hasTouch: true, isLandscape: true, deviceScaleFactor: 2 }),
                '900x400-mobile-touch-landscape@2x',
            ],
        ];
        for (var _i = 0, table_4 = table; _i < table_4.length; _i++) {
            var _a = table_4[_i], v = _a[0], o = _a[1];
            expect(utils.viewport2string(v)).toBe(o);
        }
    });
    it('knobs2string()', function () {
        var table = [
            [
                {
                    key4: false,
                    key3: true,
                    key2: 10,
                    key1: 'string',
                },
                'key1-string_key2-10_key3-true_key4-false',
            ],
            [
                {
                    'Spacing name': 'string',
                    'Spacing number': 102,
                },
                'Spacing name-string_Spacing number-102',
            ],
        ];
        for (var _i = 0, table_5 = table; _i < table_5.length; _i++) {
            var _a = table_5[_i], v = _a[0], o = _a[1];
            expect(utils.knobs2string(v)).toBe(o);
        }
    });
    it('story2filename', function () {
        var table = [
            [
                {
                    kind: 'Kind',
                    story: 'Story',
                    viewport: null,
                    namespace: null,
                    knobs: null,
                },
                'Kind-Story.png',
            ],
            [
                {
                    kind: 'foo',
                    story: 'bar',
                    viewport: {
                        width: 100,
                        height: 200,
                        isMobile: false,
                        hasTouch: false,
                        isLandscape: false,
                        deviceScaleFactor: 2,
                    },
                    namespace: null,
                    knobs: null,
                },
                'foo-bar-100x200@2x.png',
            ],
            [
                {
                    kind: 'foo',
                    story: 'bar',
                    viewport: {
                        width: 1,
                        height: 2,
                        isMobile: false,
                        hasTouch: false,
                        isLandscape: false,
                        deviceScaleFactor: 1,
                    },
                    namespace: 'baz',
                    knobs: null,
                },
                'foo-bar_baz-1x2.png',
            ],
            [
                {
                    kind: 'foo',
                    story: 'bar',
                    viewport: {
                        width: 1,
                        height: 2,
                        isMobile: false,
                        hasTouch: false,
                        isLandscape: false,
                        deviceScaleFactor: 1,
                    },
                    namespace: 'baz',
                    knobs: {
                        'Component Label': 'string',
                        falsy: false,
                        truthy: true,
                    },
                },
                'foo-bar-Component-Label-string_falsy-false_truthy-true_baz-1x2.png',
            ],
        ];
        for (var _i = 0, table_6 = table; _i < table_6.length; _i++) {
            var _a = table_6[_i], p = _a[0], o = _a[1];
            expect(utils.story2filename(p)).toBe(o);
        }
    });
    it('pascalize()', function () {
        var table = [
            ['camelCase', 'CamelCase'],
            ['foo_bar_baz', 'FooBarBaz'],
            ['foo bar baz', 'FooBarBaz'],
        ];
        for (var _i = 0, table_7 = table; _i < table_7.length; _i++) {
            var _a = table_7[_i], s = _a[0], o = _a[1];
            expect(utils.pascalize(s)).toBe(o);
        }
    });
    it('humanizeDuration()', function () {
        var table = [
            [
                1000,
                '1s',
            ],
            [
                2100,
                '2.1s',
            ],
            [
                5111,
                '5.11s',
            ],
            [
                1 * 1000 * 60 + 2000,
                '1min 2s',
            ],
            [
                19 * 1000 * 60 + 5610,
                '19min 5.61s',
            ],
        ];
        for (var _i = 0, table_8 = table; _i < table_8.length; _i++) {
            var _a = table_8[_i], n = _a[0], o = _a[1];
            expect(utils.humanizeDuration(n)).toBe(o);
        }
    });
    it('getStorybookEnv()', function () {
        window.STORYBOOK_ENV = 'react';
        expect(utils.getStorybookEnv()).toBe('react');
        window.STORYBOOK_ENV = 'angular';
        expect(utils.getStorybookEnv()).toBe('angular');
    });
});
//# sourceMappingURL=utils.test.js.map