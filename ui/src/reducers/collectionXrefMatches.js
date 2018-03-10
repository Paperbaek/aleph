import { createReducer } from 'redux-act';
import { set, update } from 'lodash/fp';

import { fetchCollectionXrefMatches, fetchNextCollectionXrefMatches } from 'actions';
import { matchesKey } from 'selectors';
import { combineResults } from 'reducers/util';

const initialState = {};

export default createReducer({
  [fetchCollectionXrefMatches.COMPLETE]: (state, { id, otherId, result }) =>
    set(matchesKey(id, otherId), result)(state),

  [fetchNextCollectionXrefMatches.START]: (state, { id, otherId }) =>
    update(matchesKey(id, otherId), set('isExpanding', true))(state),
  
  [fetchNextCollectionXrefMatches.COMPLETE]: (state, { id, otherId, prevResult, nextResult }) =>
    set(matchesKey(id, otherId), combineResults(prevResult, nextResult))(state),

}, initialState);
