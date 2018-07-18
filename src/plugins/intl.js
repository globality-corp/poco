import React from 'react';
import { IntlProvider } from 'react-intl';

const intlService = {
    name: 'intlService',
    factory: null,
    provider: () => ({ children }) => <IntlProvider locale="en">{children}</IntlProvider>,
};

export default intlService;
