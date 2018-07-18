import get from 'lodash/get';
import merge from 'lodash/merge';

import Logger from '../logger';

class ConfigurationService {
    constructor ({ appName, environment }) {
        this.logger = new Logger('ConfigurationService');
        this.logger.debug('constructor');

        this.appName = appName;
        this.config = get(environment, 'config') || {};
        this._environment = environment;
    }

    getConfig () {
        return this.config;
    }

    get (path, defaultValue) {
        return get(this.config, path, defaultValue);
    }

    // setLocal (path, value) {
    //     // TODO: set and save to localStorage:
    //     // 1. Load from localStorage
    //     // 2. Set path: value
    //     // 3. Save to localStorage
    //     // 4. Merge with this.config
    // }

    load () {
        const useRemote = get(this._environment, 'remoteConfigs.enabled', false);

        if (useRemote) {
            this.logger.debug('load remote configuration');

            const origin = get(this._environment, 'remoteConfigs.origin', '');
            const urls = get(this._environment, 'remoteConfigs.paths', []).map(path => `${origin}${path}`);
            return this.loadRemote(urls);
        }

        this.logger.debug('configuration ready');

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this);
            }, 3000);
        });
    }

    loadRemote (urls) {
        const promises = urls.map(url => fetch(url).catch((e) => {
            this.logger.error(`error loading configuration from ${url}`, e);
            return { json: () => Promise.resolve({}) };
        }));

        return Promise.all(promises).then((requests) => {
            return Promise
                .all(requests.map(request => request.json()))
                .then((responses) => {
                    const localConfig = localStorage.getItem(this.appName) || {};
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

const ConfigurationPlugin = {
    name: 'configuration',
    factory: ({ appName, environment }) => new ConfigurationService({ appName, environment }),
    provider: null,
};

export default ConfigurationPlugin;
