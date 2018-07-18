/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import Bottle from 'bottlejs';
import get from 'lodash/get';

import LaunchContainer from './components/LaunchContainer';
import Logger from './logger';
import ConfigurationPlugin from './plugins/configuration';
import type {
    AddPluginOptionsType,
    PocoConstructorType,
    PocoPluginType,
} from './types';


export class Poco {
    _loadingComponent: any;

    _plugins: Array<PocoPluginType>;

    _providerWrappers: Array<any>;

    _services: Object;

    appName: string;

    createApp: Function;

    environment: Object;

    logger: Object;

    rootElement: HTMLElement;

    state = {
        ready: false,
    }

    constructor ({
        appName,
        createApp,
        environment,
        rootElement,
    }: PocoConstructorType) {
        this._plugins = [];
        this._providerWrappers = [];
        this._services = new Bottle();

        this.logger = new Logger(appName);
        this.logger.debug('constructor');

        this.appName = appName;
        this.createApp = createApp;
        this.environment = environment;
        this.rootElement = rootElement || document.querySelector('.root');
    }

    addPlugin (pluginObject: PocoPluginType, options?: AddPluginOptionsType): Object {
        const pluginName = get(options, 'name') || pluginObject.name;

        if (!pluginObject) {
            return this;
        }

        this.logger.debug('adding plugin', pluginName);

        if (pluginObject.factory) {
            this.addFactory(pluginName, pluginObject.factory, options);
        }

        if (pluginObject.provider) {
            this.addProvider(pluginObject.provider);
        }

        this._plugins.push(pluginObject);

        return this;
    }

    addFactory (name: string, factory: Function, options?: Object): void {
        this._services.factory(name, container => factory({
            appName: this.appName,
            container,
            environment: this.environment || {},
            options,
        }));
    }

    addProvider (provider: Function): void {
        this._providerWrappers.push(provider(this._services.container));
    }

    getService (name: string): Object {
        return this._services.container[name];
    }

    load (callback?: Function): Object {
        this.logger.debug('load');

        // Load default plugins
        this.addPlugin(ConfigurationPlugin);

        document.addEventListener('DOMContentLoaded', () => {
            if (callback) {
                callback(this);
            }
            this.render();
        });

        return this;
    }

    render (): void {
        this.logger.debug('render');

        ReactDOM.render(
            this._loadingComponent
                ? this._loadingComponent
                : <div />,
            this.rootElement,
        );

        this.getService('configuration').load().then(() => {
            const { container } = this._services;
            const rootComponent = (
                <LaunchContainer
                    container={container}
                    createApp={this.createApp}
                    wrappers={this._providerWrappers}
                />
            );

            ReactDOM.render(
                rootComponent,
                this.rootElement,
            );
        });
    }

    setLoadingComponent (component: any): Object {
        this._loadingComponent = component;
        return this;
    }
}

export * from './plugins/index.js';
export * from './types';
export default Poco;
