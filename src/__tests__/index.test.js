/* @flow */

import React from 'react';

import Poco from '..';
import type { PocoPluginType, PocoConstructorType } from '../types';

describe('Poco smoke tests', () => {

    const addEventListener = jest.fn();

    // $FlowIgnore
    Object.defineProperty(document, 'addEventListener', {
        value: addEventListener,
    });

    const defaultOptions: PocoConstructorType = {
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
        const plugin: PocoPluginType = {
            name: 'myPlugin',
            factory: null,
            provider: null,
        };

        expect(instance._plugins.length).toEqual(0);

        instance.addPlugin(plugin);
        expect(instance._plugins.length).toEqual(1);
    });
});
