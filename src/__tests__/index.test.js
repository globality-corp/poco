import React from 'react';

import Poco from '..';


describe('Poco smoke tests', () => {

    const addEventListener = jest.fn();

    Object.defineProperty(document, 'addEventListener', {
        value: addEventListener,
    });

    const defaultOptions = {
        appName: 'test-app',
        createApp: () => <div>My App</div>,
        environment: {
            remoteConfigs: false,
        },
    };

    it('should create an instance', () => {
        const instance = new Poco(defaultOptions);
        expect(instance).toBeDefined();
    });

    it('should allow setting a loading component', () => {
        const LoadingComponent = () => <div>Loading component</div>;
        const instance = new Poco(defaultOptions);
        instance.setLoadingComponent(LoadingComponent);
        expect(instance._loadingComponent).toEqual(LoadingComponent);
    });

    it('should attach itself to the document', () => {
        addEventListener.mockClear();
        const instance = new Poco(defaultOptions);
        instance.load();
        expect(addEventListener).toHaveBeenCalledTimes(1);
    });

    it('should allow adding plugins', () => {
        const instance = new Poco(defaultOptions);

        expect(instance._plugins.length).toEqual(0);

        instance.addPlugin({ name: 'myPlugin' });
        expect(instance._plugins.length).toEqual(1);
    });
});
