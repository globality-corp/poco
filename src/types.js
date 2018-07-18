/* @flow */
export type PocoConstructorType = {
    appName: string,
    createApp: Function,
    environment: Object,
    rootElement: HTMLElement,
};

export type PluginType = {
    name: string,
    factory: (Object) => Object,
    provider: (Object) => any,
};

export type AddPluginOptionsType = {
    name?: string,
};
