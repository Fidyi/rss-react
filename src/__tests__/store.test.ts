import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../redux/rootReducer';
import { apiSlice } from '../redux/slices/apiSlice';
import {
  selectItem,
  unselectItem,
  clearSelections,
} from '../redux/slices/selectedSlice';
import { setSearchTerm } from '../redux/slices/searchSlice';
import store from '../redux/store';

describe('Redux Store', () => {
  it('should initialize store with the correct reducers and middleware', () => {
    const testStore = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    });
    const state = testStore.getState();

    expect(state.api).toBeDefined();
    expect(state.search).toBeDefined();
    expect(state.selected).toBeDefined();
  });

  it('should dispatch actions correctly', () => {
    const testStore = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    });
    let state;

    testStore.dispatch(setSearchTerm('pikachu'));
    state = testStore.getState();
    expect(state.search.searchTerm).toBe('pikachu');

    testStore.dispatch(selectItem('1'));
    state = testStore.getState();
    expect(state.selected.selectedItems).toContain('1');

    testStore.dispatch(unselectItem('1'));
    state = testStore.getState();
    expect(state.selected.selectedItems).not.toContain('1');

    testStore.dispatch(clearSelections());
    state = testStore.getState();
    expect(state.selected.selectedItems.length).toBe(0);
  });

  it('should use the configured store correctly', () => {
    let state = store.getState();
    expect(state.search.searchTerm).toBe('');
    expect(state.selected.selectedItems).toEqual([]);

    store.dispatch(setSearchTerm('charizard'));
    state = store.getState();
    expect(state.search.searchTerm).toBe('charizard');

    store.dispatch(selectItem('2'));
    state = store.getState();
    expect(state.selected.selectedItems).toContain('2');

    store.dispatch(unselectItem('2'));
    state = store.getState();
    expect(state.selected.selectedItems).not.toContain('2');

    store.dispatch(clearSelections());
    state = store.getState();
    expect(state.selected.selectedItems.length).toBe(0);
  });
});
