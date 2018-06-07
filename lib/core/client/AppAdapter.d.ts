import { ClientMetadata } from '../app/Browser';
import { StoryWithOptions, StoredStory } from '../../models/story';
export interface Adapter {
    getMetadata(): Promise<ClientMetadata>;
    readyComponentScreenshot(): void;
    getScreenshotStories(): StoredStory[];
    setScreenshotStories(stories: StoryWithOptions[]): void;
    failureScreenshot(err: string): void;
}
export default class AppAdapter implements Adapter {
    getMetadata(): Promise<ClientMetadata>;
    readyComponentScreenshot(): void;
    getScreenshotStories(): StoredStory[];
    setScreenshotStories(stories: StoryWithOptions[]): void;
    failureScreenshot(err: string): void;
}
