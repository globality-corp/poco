export default {
    remoteConfigs: {
        enabled: process.env.REACT_APP_REMOTE_CONFIGS_ENABLED,
        origin: process.env.REACT_APP_REMOTE_CONFIGS_ORIGIN,
        paths: (process.env.REACT_APP_REMOTE_CONFIGS_PATHS || '').split(','),
    },
}