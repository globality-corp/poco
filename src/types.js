/* @flow */

export type PocoConstructorType = {
    appName: string,
    createApp: Function,
    environment: Object,
    rootElement?: HTMLElement,
};

export type PocoPluginType = {
    name: string,
    factory: ?Function,
    provider: ?Function,
};

export type AddPluginOptionsType = {
    name?: string,
};
