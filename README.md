# poco
Opinionated, extensible React applications framework

# What is `poco`

`Poco` is a React application framework, that aims to make it easy to create applications with pre loaded services like redux, apollo client, remote configurations, etc.

# Installation

`yarn add @globality/poco`

# How to use `poco`

The following is an app that uses redux and react-intl.

```jsx
import Poco, { IntlPlugin, ReduxPlugin } from '@globality/poco';

const App = new Poco({
    appName: 'my-app',
    createApp: () => <div>Hello world!</div>,
});

App.load((app) => {
    app.addPlugin(IntlPlugin);
    app.addPlugin(ReduxPlugin, {
        rootReducer: state => state,
    });
});
```

# Constructor

`Poco` receives an object with the following properties:

- `appName` (string, required)

    Application name, is used by the plugins (i.e. to determine where to load or save configuration)

- `createApp` (function, required)

    Function that returns the React component that holds the application. It receives an object with:

    - `container`: the `bottle-js` service container
    - `onReady`: function that must be called whenever the app is ready to be shown to the user, this allows the app to load data before rendering

- `environment` (object)

    Object containing basic environment configuration:

    - `config`: configuration object that contains the default values. Remote configurations (if enabled) will be merged into this object
    - `remoteConfigs`: remote configuration loader options (more about this below)

# Plugins

Currently, there are a few included plug-ins:

- `ConfigurationPlugin` - Loads configuration from remote URLs and localStorage
- `HistoryPlugin` - Creates a `history/createBrowserHistory` instance
- `IntlPlugin` - Wraps the app in an `IntlProvider` HoC from `react-intl`
- `ReduxPlugin` - Creates a `redux` instance

# Remote configuration

The `ConfigurationPlugin` is loaded by default when `load()` is called, and uses 3 sources for loading configuration that can be used by other plugins or in your app.

The 3 sources are:

1. **Environment**: Passing a `config` object in the `environment` property will create a default configuration
2. **Remote**: Loaded from one or more remote JSON files
3. **localStorage**: Loaded from the browser's `localStorage`, intended for feature flags and session state

The different sources are loaded and merged in this order, in other words: `_.merge({}, environmentConfig, remoteConfig, localConfig)`

## Setup

In order to load configuration from remote sources, you need to pass a `remoteConfigs` object to the `environment` property:

```javascript
environment: {
    remoteConfigs: {
        enabled: true,
        origin: 'https://example.com',
        paths: ['/configs/my-app.json', '/configs/common.json'],
    },
}
```

# TODO

- Use React 16.3's Context API for providers.