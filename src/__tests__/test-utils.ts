import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { apiSlice } from '../redux/slices/apiSlice';
import { combineReducers } from 'redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import searchReducer from '../redux/slices/searchSlice';
import selectedReducer from '../redux/slices/selectedSlice';

export const setupApiStore = (api: typeof apiSlice) => {
  const getStore = (): EnhancedStore => {
    const store = configureStore({
      reducer: combineReducers({
        [api.reducerPath]: api.reducer,
        search: searchReducer,
        selected: selectedReducer,
      }),
      middleware: (gDM) => gDM().concat(api.middleware),
    });

    setupListeners(store.dispatch);
    return store;
  };

  return { store: getStore(), api: apiSlice, reducer: api.reducer };
};
