import { combineReducers } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice';
import { apiSlice } from './apiSlice';

const rootReducer = combineReducers({
  search: searchReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export default rootReducer;
