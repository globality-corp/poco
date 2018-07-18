/* @flow */

import { createBrowserHistory } from 'history';

import type { PocoPluginType } from '../types';


const history: PocoPluginType = {
    name: 'history',
    factory: ({ container }) => createBrowserHistory({
        basename: container.configuration.config.publicPath,
    }),
    provider: null,
};

export default history;
