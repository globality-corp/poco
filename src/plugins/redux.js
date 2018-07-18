/* @flow */

import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider as ReduxStoreProvider } from 'react-redux';
import thunk from 'redux-thunk';
import inject from 'redux-inject';

import type { PocoPluginType } from '../types';

const reduxStore: PocoPluginType = {
    name: 'reduxStore',
    factory: ({ container, options }) => {
        const { rootReducer } = options;

        const storeFactory = applyMiddleware(
            inject(container),
            thunk,
        )(createStore);

        const initialState = {};

        return storeFactory(
            rootReducer,
            initialState,
            window.devToolsExtension ? window.devToolsExtension() : f => f,
        );
    },
    provider: container => ({ children }) => (
        <ReduxStoreProvider store={container.reduxStore}>{children}</ReduxStoreProvider>),
};

export default reduxStore;
