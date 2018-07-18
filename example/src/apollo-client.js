/* @flow */
import React from 'react';
import { ApolloProvider } from 'react-apollo';

import createGiApolloClient from '@globality/gi-apollo-client';

import type { PocoPluginType } from '@globality/poco';

export const apolloClient: PocoPluginType = {
    name: 'apolloClient',
    factory: ({ container }) => {
        const { configuration } = container;
        const hostConfig = configuration.get('graphqlHost', {});
        const graphqlUri = `${hostConfig.origin}${hostConfig.path}`;

        return createGiApolloClient({
            getAccessToken: () => configuration.get('session.accessToken'),
            graphqlUri,
        });
    },
    provider: container => ({ children }) => (
        <ApolloProvider client={container.apolloClient}>{children}</ApolloProvider>),
};

export default apolloClient;
