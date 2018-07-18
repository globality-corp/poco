import Poco, { HistoryPlugin, IntlPlugin, ReduxPlugin } from '@globality/poco';

import createApp from './app';


const MyApp = new Poco({
    appName: 'poco-example',
    createApp,
    environment: JSON.parse(process.env.REACT_APP_ENVIRONMENT || '{}'),
});

MyApp.load((app) => {
    app.addPlugin(HistoryPlugin);
    app.addPlugin(IntlPlugin);
    app.addPlugin(ReduxPlugin, {
        rootReducer: state => state,
    });
});
