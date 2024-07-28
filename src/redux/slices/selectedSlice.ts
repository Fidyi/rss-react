import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SelectedState {
  selectedItems: string[];
}

const initialState: SelectedState = {
  selectedItems: [],
};

const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    selectItem(state, action: PayloadAction<string>) {
      if (!state.selectedItems.includes(action.payload)) {
        state.selectedItems.push(action.payload);
      }
    },
    deselectItem(state, action: PayloadAction<string>) {
      state.selectedItems = state.selectedItems.filter(
        (id) => id !== action.payload
      );
    },
  },
});

export const { selectItem, deselectItem } = selectedSlice.actions;
export default selectedSlice.reducer;
