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
        const defaultWrapper = ({ children }) => <div>{children}</div>;
        const { container, createApp, wrapper } = this.props;
        this.component = this.component || createApp({
            container,
            onReady: this.onReady,
        });
        return React.createElement(wrapper || defaultWrapper, {}, this.component);
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
    wrapper: PropTypes.func,
};

export default LaunchContainer;
