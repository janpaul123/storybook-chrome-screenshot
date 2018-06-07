import { CLIOptions } from '../../models/options';
import StoryStore from './StoryStore';
import Page, { ConsoleHandler } from './Page';
export declare type ClientMetadata = {
    clientId: number;
    clientsCount: number;
};
export default class Browser {
    private readonly id;
    private readonly store;
    private readonly options;
    private browser;
    constructor(id: number, store: StoryStore, options: CLIOptions);
    launch(): Promise<void>;
    close(): Promise<void>;
    createPage(url: string, consoleHandler: ConsoleHandler): Promise<Page>;
}
