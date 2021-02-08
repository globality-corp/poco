/* @flow */

import get from 'lodash/get';
import merge from 'lodash/merge';
import set from 'lodash/set';

import Logger from '../logger';

import type { PocoPluginType } from '../types';

class ConfigurationService {
    _environment: Object;

    appName: string;

    config: Object;

    logger: Object;

    constructor ({ appName, environment }) {
        this.logger = new Logger('ConfigurationService');
        this.logger.debug('constructor');

        this.appName = appName;
        this.config = get(environment, 'config') || {};
        this._environment = environment;
    }

    getConfig (): Object {
        return this.config;
    }

    get (path: string, defaultValue?: any): any {
        return get(this.config, path, defaultValue);
    }

    getLocal () {
        return JSON.parse(localStorage.getItem(this.appName) || '{}');
    }

    setLocal (path, value) {
        const currentValue = this.getLocal();
        set(currentValue, path, value);
        localStorage.setItem(this.appName, JSON.stringify(currentValue));
        this.config = merge(this.config, currentValue);
    }

    load (): Promise<Object> {
        const useRemote = get(this._environment, 'remoteConfigs.enabled', false);

        if (useRemote) {
            this.logger.debug('load remote configuration');

            const origin = get(this._environment, 'remoteConfigs.origin', '');
            const urls = get(this._environment, 'remoteConfigs.paths', [])
                .filter(Boolean)
                .map(path => `${origin}${path}`);
            return this.loadRemote(urls);
        }

        this.logger.debug('configuration ready');

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this);
            }, 500);
        });
    }

    loadRemote (urls: Array<string>): Promise<Object> | any {
        const promises = urls.map(url => fetch(url).catch((e) => {
            this.logger.error(`error loading configuration from ${url}`, e);
            return { json: () => Promise.resolve({}) };
        }));

        return Promise.all(promises).then((requests) => {
            return Promise
                .all(requests.map(request => request.json()))
                .then((responses) => {
                    const localConfig = this.getLocal();
                    const merged = merge({}, ...responses, this.config, localConfig);
                    this.config = merged;
                    this.logger.debug('merged configurations', this.config);
                    return Promise.resolve(this);
                });
        }).catch((error) => {
            this.logger.error('Error when fetching remote configuration', error);
        });
    }
}

const ConfigurationPlugin: PocoPluginType = {
    name: 'configuration',
    factory: ({ appName, environment }) => new ConfigurationService({ appName, environment }),
    provider: null,
};

export default ConfigurationPlugin;
