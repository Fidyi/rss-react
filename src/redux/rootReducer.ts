import { combineReducers } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice';
import selectedReducer from './slices/selectedSlice';
import { apiSlice } from './slices/apiSlice';

const rootReducer = combineReducers({
  search: searchReducer,
  selected: selectedReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export default rootReducer;
