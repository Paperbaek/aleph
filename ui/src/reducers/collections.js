import { createReducer } from 'redux-act';
import { set, update } from 'lodash/fp';

import { fetchCollection, updateCollection, queryCollections } from 'actions';
import { cacheResults } from './util';

const initialState = {};

export default createReducer({
  [queryCollections.COMPLETE]: cacheResults,

  [fetchCollection.START]: (state, { id }) =>
    update(id, set('isFetching', true))(state),

  [fetchCollection.ERROR]: (state, { error, args: { id } }) =>
    set(id, { error: error.message })(state),

  [fetchCollection.COMPLETE]: (state, { id, data }) =>
    set(id, data)(state),

  [updateCollection.COMPLETE]: (state, { id, data }) =>
    set(id, data)(state),
}, initialState);
