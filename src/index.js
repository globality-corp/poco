/* @flow */
import React from 'react';
import ReactDOM from 'react-dom';
import Bottle from 'bottlejs';

import LaunchContainer from './components/LaunchContainer';
import Logger from './logger';
import ConfigurationPlugin from './plugins/configuration';
import type {
    PocoConstructorType,
    AddPluginOptionsType,
    PluginType,
} from './types';


export class Poco {
    _loadingComponent: any;

    _plugins: Array<PluginType>;

    _services: Object;

    appName: string;

    createApp: Function;

    environment: Object;

    logger: Object;

    providerWrapper: any;

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
        this.logger = new Logger(appName);
        this.logger.debug('constructor');

        this.appName = appName;
        this.createApp = createApp;
        this.environment = environment;
        this.rootElement = rootElement || document.querySelector('.root');

        // Load default plugins
        this.addPlugin(ConfigurationPlugin);
    }

    load (callback?: Function): void {
        this.logger.debug('load');

        document.addEventListener('DOMContentLoaded', () => {
            if (callback) {
                callback(this);
            }
            this.render();
        });
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
                    wrapper={this.providerWrapper}
                />
            );

            ReactDOM.render(
                rootComponent,
                this.rootElement,
            );
        });
    }

    addPlugin (pluginObject: PluginType, options?: AddPluginOptionsType): void {
        if (!this._plugins) {
            this._plugins = [];
        }

        if (!this._services) {
            this._services = new Bottle();
        }

        let pluginName;

        if (options && options.name) {
            pluginName = options.name;
        } else {
            pluginName = pluginObject.name;
        }

        if (!pluginObject) {
            return;
        }

        this.logger.debug('adding plugin', pluginName);

        if (pluginObject.factory) {
            this._services.factory(pluginName, container => pluginObject.factory({
                appName: this.appName,
                container,
                environment: this.environment || {},
            }));
        }

        if (pluginObject.provider) {
            const { provider } = pluginObject;
            const { container } = this._services;

            if (!this.providerWrapper) {
                this.providerWrapper = provider(container);
            } else {
                this.providerWrapper = React.createElement(
                    provider(container),
                    { container },
                    this.providerWrapper,
                );
            }
        }

        this._plugins.push(pluginObject);
    }

    getService (name: string): Object {
        return this._services.container[name];
    }

    setLoadingComponent (component: any): void {
        this._loadingComponent = component;
    }
}

export * from './plugins/index.js';
export default Poco;
