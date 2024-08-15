import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SearchState {
  searchTerm: string;
  searchHistory: string[];
}

const initialState: SearchState = {
  searchTerm: '',
  searchHistory: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      const searchTerm = action.payload.trim();
      state.searchTerm = searchTerm;

      if (searchTerm && !state.searchHistory.includes(searchTerm)) {
        state.searchHistory = [searchTerm, ...state.searchHistory].slice(0, 10);
      }
    },
    clearSearchHistory(state) {
      state.searchHistory = [];
    },
  },
});

export const { setSearchTerm, clearSearchHistory } = searchSlice.actions;

export default searchSlice.reducer;
