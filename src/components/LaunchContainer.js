/* @flow */

import React from 'react';
import { CircularProgress } from '@material-ui/core';

import { SplashScreen } from './styled-components';


type LaunchContainerProps = {
    container: Object,
    createApp: Function,
    wrappers: Array<any>,
};

type LaunchContainerState = {
    ready: boolean,
}

class LaunchContainer extends React.Component<LaunchContainerProps, LaunchContainerState> {
    component: Object;

    state = {
        ready: false,
    };

    onReady = (): void => {
        this.setState({ ready: true });
    }

    getComponent = (): Object => {
        const { container, createApp, wrappers } = this.props;
        this.component = this.component || createApp({
            container,
            onReady: this.onReady,
        });

        return wrappers.reduce(
            (child: any, provider: any) => React.createElement(
                provider,
                { container },
                child,
            ),
            this.component,
        );
    }

    render () {
        const { ready } = this.state;

        return (
            <div>
                {!ready && (
                    <SplashScreen>
                        <CircularProgress size={50} />
                    </SplashScreen>
                )}
                <div style={{ visibility: ready ? 'visible' : 'hidden' }}>
                    {this.getComponent()}
                </div>
            </div>
        );
    }
}

export default LaunchContainer;
