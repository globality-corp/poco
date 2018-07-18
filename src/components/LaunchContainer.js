import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';

import { SplashScreen } from './styled-components';


class LaunchContainer extends React.Component {
    state = {
        ready: false,
    };

    onReady = () => {
        this.setState({ ready: true });
    }

    getComponent = () => {
        // const defaultWrapper = ({ children }) => <div>{children}</div>;
        const { container, createApp, wrappers } = this.props;
        this.component = this.component || createApp({
            container,
            onReady: this.onReady,
        });

        return wrappers.reduce(
            (child, provider) => React.createElement(
                provider,
                { container: this.container },
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

LaunchContainer.propTypes = {
    container: PropTypes.object.isRequired,
    createApp: PropTypes.func.isRequired,
    wrappers: PropTypes.array,
};

export default LaunchContainer;
