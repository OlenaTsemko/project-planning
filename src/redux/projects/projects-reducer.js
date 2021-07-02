import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

import {
  getAllProjectsRequest,
  getAllProjectsSuccess,
  getAllProjectsError,
  createProjectRequest,
  createProjectSuccess,
  createProjectError,
  deleteProjectRequest,
  deleteProjectSuccess,
  deleteProjectError,
  updateProjectRequest,
  updateProjectSuccess,
  updateProjectError,
  addParticipantRequest,
  addParticipantSuccess,
  addParticipantError,
  deleteParticipantRequest,
  deleteParticipantSuccess,
  deleteParticipantError,
  getProjectByIdRequest,
  getProjectByIdSuccess,
  getProjectByIdError,
  getAllParticipantsRequest,
  getAllParticipantsSuccess,
  getAllParticipantsError,
} from './projects-actions';

import { logoutSuccess } from 'redux/auth/auth-actions';

const projectItems = createReducer([], {
  [getAllProjectsSuccess]: (_, { payload }) => payload,
  [createProjectSuccess]: (state, { payload }) => [...state, payload],
  [deleteProjectSuccess]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
  [updateProjectSuccess]: (state, { payload }) =>
    state.map(item => (item.id === payload.id ? payload : item)),

  [logoutSuccess]: () => [],
});

const participants = createReducer([], {
  [getAllParticipantsSuccess]: (_, { payload }) => payload.participants,
  [addParticipantSuccess]: (_, { payload }) => payload,
  [deleteParticipantSuccess]: (_, { payload }) => payload,
});

const currentProject = createReducer(null, {
  [getProjectByIdSuccess]: (_, { payload }) => payload,
});

const loading = createReducer(false, {
  [getAllProjectsRequest]: () => true,
  [getAllProjectsSuccess]: () => false,
  [getAllProjectsError]: () => false,
  [createProjectRequest]: () => true,
  [createProjectSuccess]: () => false,
  [createProjectError]: () => false,
  [deleteProjectRequest]: () => true,
  [deleteProjectSuccess]: () => false,
  [deleteProjectError]: () => false,
  [updateProjectRequest]: () => true,
  [updateProjectSuccess]: () => false,
  [updateProjectError]: () => false,
  [addParticipantRequest]: () => true,
  [addParticipantSuccess]: () => false,
  [addParticipantError]: () => false,
  [deleteParticipantRequest]: () => true,
  [deleteParticipantSuccess]: () => false,
  [deleteParticipantError]: () => false,
  [getProjectByIdRequest]: () => true,
  [getProjectByIdSuccess]: () => false,
  [getProjectByIdError]: () => false,
  [getAllParticipantsRequest]: () => true,
  [getAllParticipantsSuccess]: () => false,
  [getAllParticipantsError]: () => false,
});

const error = createReducer(null, {
  [getAllProjectsError]: (_, { payload }) => payload,
  [getAllProjectsRequest]: () => null,
  [createProjectError]: (_, { payload }) => payload,
  [createProjectRequest]: () => null,
  [deleteProjectError]: (_, { payload }) => payload,
  [deleteProjectRequest]: () => null,
  [updateProjectError]: (_, { payload }) => payload,
  [updateProjectRequest]: () => null,
  [addParticipantError]: (_, { payload }) => payload,
  [addParticipantRequest]: () => null,
  [deleteParticipantError]: (_, { payload }) => payload,
  [deleteParticipantRequest]: () => null,
  [getProjectByIdError]: (_, { payload }) => payload,
  [getProjectByIdRequest]: () => null,
  [getAllParticipantsError]: (_, { payload }) => payload,
  [getAllParticipantsRequest]: () => null,
});

export default combineReducers({
  items: projectItems,
  currentProject,
  participants,
  loading,
  error,
});
