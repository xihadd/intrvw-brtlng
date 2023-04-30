import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

export type Attribute = {
  id: string;
  name: string;
  slug: string;
  inputType: string;
  withChoices: boolean;
  choices: Choice[];
};

export type Choice = {
  id: string;
  name: string;
  slug: string;
  filter: string;
};

export interface FilterState {
  selectedFilters: Choice[];
}

const initialState: FilterState = {
  selectedFilters: [],
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    updateChoices: (state, action: PayloadAction<Choice[]>) => {
      state.selectedFilters = action.payload
    },
  },
});

export const { updateChoices } = filterSlice.actions;

export default filterSlice.reducer;
