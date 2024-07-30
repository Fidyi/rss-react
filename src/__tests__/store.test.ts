import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../redux/rootReducer';
import { apiSlice } from '../redux/slices/apiSlice';
import {
  selectItem,
  unselectItem,
  clearSelections,
} from '../redux/slices/selectedSlice';
import { setSearchTerm } from '../redux/slices/searchSlice';

describe('Redux Store', () => {
  it('should initialize store with the correct reducers and middleware', () => {
    const store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    });
    const state = store.getState();

    expect(state.api).toBeDefined();

    expect(state.search).toBeDefined();

    expect(state.selected).toBeDefined();
  });

  it('should dispatch actions correctly', () => {
    const store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    });
    let state;

    store.dispatch(setSearchTerm('pikachu'));
    state = store.getState();
    expect(state.search.searchTerm).toBe('pikachu');

    store.dispatch(selectItem('1'));
    state = store.getState();
    expect(state.selected.selectedItems).toContain('1');

    store.dispatch(unselectItem('1'));
    state = store.getState();
    expect(state.selected.selectedItems).not.toContain('1');

    store.dispatch(clearSelections());
    state = store.getState();
    expect(state.selected.selectedItems.length).toBe(0);
  });
});
