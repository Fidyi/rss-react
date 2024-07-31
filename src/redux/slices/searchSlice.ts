import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SearchState {
  searchTerm: string;
  searchHistory: string[];
}

const initialState: SearchState = {
  searchTerm: '',
  searchHistory: JSON.parse(localStorage.getItem('searchHistory') || '[]'),
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
      localStorage.setItem(
        'searchHistory',
        JSON.stringify(state.searchHistory)
      );
    },
  },
});

export const { setSearchTerm } = searchSlice.actions;

export default searchSlice.reducer;
