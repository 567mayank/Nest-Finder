import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  favouriteData : []
}

export const favouriteSlice = createSlice({
  name : "Favourite",
  initialState,
  reducers : {
    setFavouriteData : (state, action) => {
      state.favouriteData.push(action.payload)
    }
  }
}) 

export const {setFavouriteData} = favouriteSlice.actions

export default favouriteSlice.reducer