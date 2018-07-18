import Poco, { HistoryPlugin, IntlPlugin, ReduxPlugin } from '@globality/poco';

import createApp from './app';
import environment from './environment';


const MyApp = new Poco({
    appName: 'poco-example',
    createApp,
    environment,
});

MyApp.load((app) => {
    app.addPlugin(HistoryPlugin);
    app.addPlugin(IntlPlugin);
    app.addPlugin(ReduxPlugin, {
        rootReducer: state => state,
    });
});
