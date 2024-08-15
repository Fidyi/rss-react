import {
  configureStore,
  EnhancedStore,
  StoreEnhancer,
  ThunkDispatch,
  Tuple,
  UnknownAction,
} from '@reduxjs/toolkit';
import rootReducer from '../redux/rootReducer';
import {
  selectItem,
  unselectItem,
  clearSelections,
  SelectedState,
} from '../redux/slices/selectedSlice';
import { SearchState, setSearchTerm } from '../redux/slices/searchSlice';
import store from '../redux/store';

describe('Redux Store', () => {
  let testStore: EnhancedStore<
    { search: SearchState; selected: SelectedState },
    UnknownAction,
    Tuple<
      [
        StoreEnhancer<{
          dispatch: ThunkDispatch<
            { search: SearchState; selected: SelectedState },
            undefined,
            UnknownAction
          >;
        }>,
        StoreEnhancer,
      ]
    >
  >;

  beforeEach(() => {
    testStore = configureStore({
      reducer: rootReducer,
    });
  });

  it('should initialize store with the correct reducers', () => {
    const state = testStore.getState();

    expect(state.search).toBeDefined();
    expect(state.selected).toBeDefined();
  });

  it('should dispatch actions correctly', () => {
    testStore.dispatch(setSearchTerm('pikachu'));
    let state = testStore.getState();
    expect(state.search.searchTerm).toBe('pikachu');

    testStore.dispatch(selectItem('1'));
    state = testStore.getState();
    expect(state.selected.selectedItems).toContain('1');

    testStore.dispatch(unselectItem('1'));
    state = testStore.getState();
    expect(state.selected.selectedItems).not.toContain('1');

    testStore.dispatch(clearSelections());
    state = testStore.getState();
    expect(state.selected.selectedItems).toHaveLength(0);
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
    expect(state.selected.selectedItems).toHaveLength(0);
  });
});
