import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  homeProperties: [],
  homePropertiesWithUserLikes : []
}

export const dataSlice = createSlice({
  name: "data",
  initialState, 
  reducers: {
    addProperties: (state, action) => {
      state.homeProperties.push(action.payload); 
    },
    addHomePropertiesWithUserLikes : (state, action) => {
      state.homePropertiesWithUserLikes.push(action.payload)
    }
  },
});

export const {addProperties, addHomePropertiesWithUserLikes} = dataSlice.actions

export default dataSlice.reducer