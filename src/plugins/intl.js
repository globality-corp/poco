/* @flow */

import React from 'react';
import { IntlProvider } from 'react-intl';

import type { PocoPluginType } from '../types';

const intlService: PocoPluginType = {
    name: 'intlService',
    factory: null,
    provider: () => ({ children }) => <IntlProvider locale="en">{children}</IntlProvider>,
};

export default intlService;
