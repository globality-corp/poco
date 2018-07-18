/* @flow */

import { combineReducers } from 'redux';
import { uiStateReducer } from 'react-redux-ui-state';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    form: formReducer,
    uiState: uiStateReducer,
});
