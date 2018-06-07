import { PartialScreenshotOptions } from '../../models/options';
import { Story } from '../../models/story';
import { NgStory } from './models';
declare const withScreenshot: (options?: PartialScreenshotOptions) => (getStory: (story: Story) => NgStory) => NgStory | ((story: Story) => NgStory);
export default withScreenshot;
