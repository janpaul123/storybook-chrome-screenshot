import { CLIOptions } from '../../models/options';
import StoryStore from './StoryStore';
import Terminal from './Terminal';
import Server from './Server';
import Browser from './Browser';
export default class App {
    private options;
    private store;
    private terminal;
    private server;
    private browsers;
    private pages;
    private startTime;
    constructor(options: CLIOptions, store: StoryStore, terminal: Terminal, server: Server, browserFactory: (id: number) => Browser);
    validate(): Promise<void>;
    launch(): Promise<void>;
    prepare(): Promise<void>;
    capture(): Promise<void>;
    teardown(): Promise<void>;
    terminate(e?: Error): Promise<void>;
}
