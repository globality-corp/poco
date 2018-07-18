import React from 'react';
import { ApolloProvider } from 'react-apollo';

import createGiApolloClient from '@globality/gi-apollo-client';


export const apolloClient = {
    name: 'apolloClient',
    factory: ({ container }) => {
        const { configuration } = container;
        const hostConfig = configuration.get('graphqlHost', {});
        const graphqlUri = `${hostConfig.origin}${hostConfig.path}`;

        return createGiApolloClient({
            getAccessToken: () => configuration.get('session.idToken'),
            graphqlUri,
        });
    },
    provider: container => ({ children }) => (
        <ApolloProvider client={container.apolloClient}>{children}</ApolloProvider>),
};

export default apolloClient;
