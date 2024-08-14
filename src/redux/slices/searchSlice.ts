import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SearchState {
  searchTerm: string;
  searchHistory: string[];
}

const getInitialSearchHistory = (): string[] => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('searchHistory') || '[]');
  }
  return [];
};

const initialState: SearchState = {
  searchTerm: '',
  searchHistory: getInitialSearchHistory(),
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
      state.searchHistory = [
        action.payload,
        ...state.searchHistory.filter((term) => term !== action.payload),
      ].slice(0, 10);
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'searchHistory',
          JSON.stringify(state.searchHistory)
        );
      }
    },
  },
});

export const { setSearchTerm } = searchSlice.actions;

export default searchSlice.reducer;
