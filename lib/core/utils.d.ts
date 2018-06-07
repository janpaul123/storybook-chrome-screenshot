import { Viewport } from '../models/viewport';
import { Knobs, StoredKnobs } from '../models/knobs';
import { StorybookEnv } from '../models/storybook';
export declare const sleep: (ms: number) => Promise<{}>;
export declare const parser: {
    identity: (v: string | undefined) => string | undefined;
    number: (v: string | undefined) => number;
    list: (v: string | undefined) => string[] | null;
    regexp: (v: string | undefined) => RegExp | null;
};
export declare const filenamify: (filename: string) => string;
export declare const permutationKnobs: (knobs: Knobs) => StoredKnobs[];
export declare const knobsQueryObject: (knobs: StoredKnobs) => StoredKnobs;
export declare const viewport2string: (viewport: Viewport) => string;
export declare const knobs2string: (knobs: StoredKnobs) => string;
export interface Story2FilenameParams {
    kind: string;
    story: string;
    viewport: Viewport | null;
    namespace: string | null;
    knobs: StoredKnobs | null;
}
export declare const story2filename: (params: Story2FilenameParams) => string;
export declare const pascalize: (v: string) => string;
export declare const humanizeDuration: (timestamp: number) => string;
export declare type Task<T> = (idx: number) => Promise<T>;
export declare const execParalell: <T>(tasks: Task<T>[], p?: number) => Promise<T[]>;
export declare const getStorybookEnv: () => StorybookEnv;
