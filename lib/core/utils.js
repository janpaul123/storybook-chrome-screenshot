"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var sanitize = require("sanitize-filename");
exports.sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
exports.parser = {
    identity: function (v) { return v; },
    number: function (v) { return v ? parseInt(v, 10) : 0; },
    list: function (v) { return v ? v.split(',').map(function (o) { return o.trim(); }) : null; },
    regexp: function (v) { return v ? new RegExp(v) : null; },
};
exports.filenamify = function (filename) { return (sanitize(filename.trim())
    .replace(/\s{2,}/g, ' ')
    .replace(/\s/g, '-')); };
exports.permutationKnobs = function (knobs) {
    var keys = Object.keys(knobs).sort();
    if (keys.length === 0) {
        return [];
    }
    var total = keys.reduce(function (previous, current) { return (previous * knobs[current].length); }, 1);
    var result = [];
    var q, r = 0;
    for (var i = 0; i < total; i += 1) {
        result[i] = {};
        q = i;
        for (var n = 0; n < keys.length; n += 1) {
            var key = keys[n];
            r = q % knobs[key].length;
            q = Math.floor(q / knobs[key].length);
            result[i][key] = knobs[key][r];
        }
    }
    return result;
};
exports.knobsQueryObject = function (knobs) {
    var queryObject = {};
    for (var _i = 0, _a = Object.entries(knobs); _i < _a.length; _i++) {
        var _b = _a[_i], name_1 = _b[0], knob = _b[1];
        queryObject["knob-" + name_1] = knob;
    }
    return queryObject;
};
exports.viewport2string = function (viewport) { return ([
    viewport.width + "x" + viewport.height,
    "" + (viewport.isMobile ? '-mobile' : ''),
    "" + (viewport.hasTouch ? '-touch' : ''),
    "" + (viewport.isLandscape ? '-landscape' : ''),
    "" + (viewport.deviceScaleFactor > 1 ? "@" + viewport.deviceScaleFactor + "x" : ''),
].join('')); };
exports.knobs2string = function (knobs) { return (Object.keys(knobs).sort().map(function (key) { return (key + "-" + knobs[key]); }).join('_')); };
exports.story2filename = function (params) {
    var ns = params.namespace ? "_" + params.namespace : '';
    var vp = params.viewport ? "-" + exports.viewport2string(params.viewport) : '';
    var knobs = params.knobs ? "-" + exports.knobs2string(params.knobs) : '';
    var filename = "" + exports.filenamify(params.kind + "-" + params.story + knobs + ns + vp);
    return filename + ".png";
};
exports.pascalize = function (v) { return ("" + v.charAt(0).toUpperCase() + _.camelCase(v.slice(1))); };
var Time = {
    MINUTES: 1000 * 60,
    SECONDS: 1000,
};
exports.humanizeDuration = function (timestamp) {
    var arr = [];
    var ts = timestamp;
    if (timestamp > Time.MINUTES) {
        var min = Math.floor(ts / Time.MINUTES);
        ts = ts - (min * Time.MINUTES);
        arr.push(min + "min");
    }
    var sec = (ts / Time.SECONDS)
        .toString()
        .split('.')
        .map(function (s) { return s.slice(0, 2); })
        .join('.');
    arr.push(sec + "s");
    return arr.join(' ');
};
exports.execParalell = function (tasks, p) {
    if (p === void 0) { p = 1; }
    var copied = tasks.slice();
    var results = [];
    return Promise.all(_.range(p).map(function (i) {
        return new Promise(function (res, rej) {
            function next() {
                var t = copied.shift();
                if (!t) {
                    return Promise.resolve(res());
                }
                return t(i).then(function (r) { return results.push(r); }).then(next).catch(function (err) { return rej(err); });
            }
            return next();
        });
    })).then(function () { return results; });
};
exports.getStorybookEnv = function () { return (window.STORYBOOK_ENV // tslint:disable-line: no-any
); };
//# sourceMappingURL=utils.js.map