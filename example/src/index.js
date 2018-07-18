import Poco, { HistoryPlugin, IntlPlugin, ReduxPlugin } from '@globality/poco';

import createApp from './app';
import rootReducer from './reducer';


const POCO_ENVIRONMENT = Object.freeze({
    remoteConfigs: {
        enabled: true,
        origin: 'https://mariote.dev.globality.io',
        paths: ['/configs/common.json', '/configs/mariote.json'],
    },
    config: {
        auth0: {
            clientId: '<auth0-client-id>',
            domain: '<auth0-domain>',
        },
    }
}); // this will be replaced by a webpack loader and .env files

const MyApp = new Poco({
    appName: 'poco-example',
    createApp,
    environment: POCO_ENVIRONMENT,
});

MyApp.load((app) => {
    app.addPlugin(HistoryPlugin);
    app.addPlugin(IntlPlugin);
    app.addPlugin(ReduxPlugin, {
        rootReducer,
    });
});
