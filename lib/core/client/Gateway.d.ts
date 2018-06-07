import { Adapter } from './AppAdapter';
import { StoredStory, StoryWithOptions } from '../../models/story';
export default class Gateway {
    private adapter;
    constructor(adapter: Adapter);
    getMetadata(): Promise<{
        clientId: number;
        clientsCount: number;
    }>;
    readyComponent(): void;
    getStories(): StoredStory[];
    setStories(stories: StoryWithOptions[]): void;
    failure(err: Error | string): void;
}
