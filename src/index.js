/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import Bottle from 'bottlejs';

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

    _services: Object;

    appName: string;

    createApp: Function;

    environment: Object;

    logger: Object;

    providerWrappers: any;

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
        this._services = new Bottle();

        this.logger = new Logger(appName);
        this.logger.debug('constructor');

        this.appName = appName;
        this.createApp = createApp;
        this.environment = environment;
        this.rootElement = rootElement || document.querySelector('.root');
    }

    addPlugin (pluginObject: PocoPluginType, options?: AddPluginOptionsType): Object {
        let pluginName;

        if (options && options.name) {
            pluginName = options.name;
        } else {
            pluginName = pluginObject.name;
        }

        if (!pluginObject) {
            return this;
        }

        this.logger.debug('adding plugin', pluginName);

        if (pluginObject.factory) {
            const { factory } = pluginObject;
            this._services.factory(pluginName, container => factory({
                appName: this.appName,
                container,
                environment: this.environment || {},
                options,
            }));
        }

        if (pluginObject.provider) {
            const { provider } = pluginObject;
            const { container } = this._services;

            if (!this.providerWrappers) {
                this.providerWrappers = [];
            }

            this.providerWrappers.push(provider(container));
        }

        this._plugins.push(pluginObject);

        return this;
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
                    wrappers={this.providerWrappers}
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
