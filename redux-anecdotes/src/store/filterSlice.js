import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    startFilter(state, action) {
      return action.payload;
    },
  },
});

export const { startFilter } = filterSlice.actions;
export default filterSlice.reducer;
