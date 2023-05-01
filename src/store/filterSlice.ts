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

export enum Sort {
  ASC = "ASC",
  DESC = "DESC",
  default = "",
}

export interface FilterState {
  selectedFilters: Choice[];
  sortBy: Sort;
}

const initialState: FilterState = {
  selectedFilters: [],
  sortBy: Sort.default,
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    updateChoices: (state, action: PayloadAction<Choice[]>) => {
      state.selectedFilters = action.payload;
    },
    updateSortBy: (state, action: PayloadAction<Sort>) => {
      state.sortBy = action.payload;
    }
  },
});

export const { updateChoices, updateSortBy } = filterSlice.actions;

export default filterSlice.reducer;
