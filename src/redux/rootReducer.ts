import { combineReducers } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice';
import selectedReducer from './slices/selectedSlice';

const rootReducer = combineReducers({
  search: searchReducer,
  selected: selectedReducer,
});

export default rootReducer;
