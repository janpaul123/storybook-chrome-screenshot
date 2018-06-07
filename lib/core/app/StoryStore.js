"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var utils_1 = require("../utils");
var StoryStore = /** @class */ (function () {
    function StoryStore(filterKind, filterStory) {
        this.stories = [];
        this.filterKind = filterKind;
        this.filterStory = filterStory;
    }
    StoryStore.prototype.set = function (stories) {
        var _this = this;
        this.stories = [];
        stories.forEach(function (story) {
            var skipped = _this.isSkipStory(story);
            var isMultipleViewport = Array.isArray(story.viewport);
            var isEmptyKnobs = lodash_1.isEmpty(story.knobs);
            var viewports = isMultipleViewport
                ? story.viewport
                : [story.viewport];
            var storyPush = function (viewport, knobs) {
                _this.stories.push({
                    kind: story.kind,
                    story: story.story,
                    viewport: viewport,
                    knobs: knobs,
                    skipped: skipped,
                    filename: utils_1.story2filename({
                        kind: story.kind,
                        story: story.story,
                        namespace: story.namespace,
                        viewport: isMultipleViewport ? viewport : null,
                        knobs: !isEmptyKnobs ? knobs : null,
                    }),
                });
            };
            viewports.forEach(function (viewport) {
                if (isEmptyKnobs) {
                    storyPush(viewport, {});
                    return;
                }
                var knobList = utils_1.permutationKnobs(story.knobs);
                for (var _i = 0, knobList_1 = knobList; _i < knobList_1.length; _i++) {
                    var knobs = knobList_1[_i];
                    storyPush(viewport, knobs);
                }
            });
        });
    };
    StoryStore.prototype.get = function (skipped) {
        if (skipped === void 0) { skipped = false; }
        return this.stories.filter(function (story) { return story.skipped === skipped; });
    };
    StoryStore.prototype.isSkipStory = function (story) {
        return !!((this.filterKind && !this.filterKind.test(story.kind)) ||
            (this.filterStory && !this.filterStory.test(story.story)));
    };
    return StoryStore;
}());
exports.default = StoryStore;
//# sourceMappingURL=StoryStore.js.map