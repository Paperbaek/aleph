import { endpoint } from 'app/api';
import asyncActionCreator from './asyncActionCreator';
import { suggestRoles, fetchRole, updateRole } from './roleActions';
import { fetchAlerts, addAlert, deleteAlert } from './alertActions';
import { fetchFacet } from './facetActions';
import {
  fetchDocument,
  queryDocumentRecords,
} from './documentActions';
import {
  queryCollections,
  fetchCollection,
  updateCollection,
  fetchCollectionPermissions,
  updateCollectionPermissions,
  fetchCollectionXrefIndex,
  fetchCollectionXrefMatches,
  fetchNextCollectionXrefMatches
} from './collectionActions';
import {
  queryEntities,
  fetchEntity,
  fetchEntityReferences,
  fetchEntityTags
} from './entityActions';


export {
  suggestRoles,
  fetchRole,
  updateRole,
  fetchAlerts,
  addAlert,
  deleteAlert,
  queryEntities,
  fetchEntity,
  fetchEntityReferences,
  fetchEntityTags,
  fetchDocument,
  queryDocumentRecords,
  fetchFacet,
  queryCollections,
  fetchCollection,
  updateCollection,
  fetchCollectionPermissions,
  updateCollectionPermissions,
  fetchCollectionXrefIndex,
  fetchCollectionXrefMatches,
  fetchNextCollectionXrefMatches
};

export const fetchMetadata = asyncActionCreator(() => async dispatch => {
  const response = await endpoint.get('metadata');
  return { metadata: response.data };
}, { name: 'FETCH_METADATA' });

export const fetchStatistics = asyncActionCreator(() => async dispatch => {
  const response = await endpoint.get('statistics');
  return { statistics: response.data };
}, { name: 'FETCH_STATISTICS' });
