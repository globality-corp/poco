import { createBrowserHistory } from 'history';

const history = {
    name: 'history',
    factory: ({ container }) => createBrowserHistory({
        basename: container.configuration.config.publicPath,
    }),
    provider: null,
};

export default history;
