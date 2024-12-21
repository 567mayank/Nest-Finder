import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  homeProperties: [],
}

export const dataSlice = createSlice({
  name: "data",
  initialState, 
  reducers: {
    addProperties: (state, action) => {
      state.homeProperties.push(action.payload); 
    },
  },
});

export const {addProperties} = dataSlice.actions

export default dataSlice.reducer