import {createReducer} from '@reduxjs/toolkit';
import {getAllSubjects, getTestsBySubject} from './subjectTests.actions';

const initialState = {
  subjects: [],
  error: null,
  loading: false,
  testsLoading: false,
  testsError: null,
  tests: [],
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(getAllSubjects.pending, (state) => {
      state.loading = true;
      state.error = false;
    })
    .addCase(getAllSubjects.fulfilled, (state, {payload}) => {
      state.subjects = payload;
      state.loading = false;
    })
    .addCase(getAllSubjects.rejected, (state, {error}) => {
      state.loading = false;
      state.error = error;
    })
    .addCase(getTestsBySubject.pending, (state) => {
      state.testsLoading = true;
    })
    .addCase(getTestsBySubject.fulfilled, (state, {payload}) => {
      state.tests = payload;
      state.testsLoading = false;
    })
    .addCase(getTestsBySubject.rejected, (state, {error}) => {
      state.testsError = error;
      state.testsLoading = false;
    }),
);
