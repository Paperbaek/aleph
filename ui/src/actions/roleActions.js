import { endpoint } from 'app/api';
import asyncActionCreator from './asyncActionCreator';


export const suggestRoles = asyncActionCreator((prefix, exclude) => async dispatch => {
  const response = await endpoint.get(`roles/_suggest`, {params: {prefix, exclude}});
  return response.data;
}, { name: 'SUGGEST_ROLES' });

export const fetchRole = asyncActionCreator((id) => async dispatch => {
  const response = await endpoint.get(`roles/${id}`);
  return { role: response.data };
}, { name: 'FETCH_ROLE' });

export const updateRole = asyncActionCreator((role) => async dispatch => {
  const response = await endpoint.post(`roles/${role.id}`, role);
  return {role: response.data};
}, {name: 'UPDATE_ROLE'});