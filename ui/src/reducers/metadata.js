import { createReducer } from 'redux-act';

import { fetchMetadata } from 'actions';

const initialState = {
  isLoaded: false,
};

export default createReducer({
  [fetchMetadata.START]: state => ({ isLoaded: false }),
  [fetchMetadata.COMPLETE]: (state, { metadata }) => ({
    ...metadata,
    isLoaded: true
  }),
}, initialState);
