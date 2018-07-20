import React from 'react';
import { Router, Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';

const MainPage = ({ container }) => {
    return (
        <div>
            <p>My App</p>
            <pre style={{ fontSize: '10px', color: '#ccc' }}>
                {JSON.stringify(container.configuration.config, null, 2)}
            </pre>
            <Link to='/secondary'>Next</Link>
        </div>
    );
}

const SecondPage = () => {
    return (
        <div>
            <p>Secondary page</p>
            <Link to='/'>Go back</Link>
        </div>
    );
}

export default function createApp ({ container, onReady }) {
    const { history } = container;
    setTimeout(() => onReady(), 1000);

    return (
        <Router history={history}>
            <Switch>
                <Route path='/secondary' component={SecondPage} exact />
                <Route path='/' render={() => <MainPage container={container} />} />
            </Switch>
        </Router>
    );
}