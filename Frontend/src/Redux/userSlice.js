import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  profile : {},
  userRentedProp : [],
  userSaleProp : []
}

export const userSlice = createSlice({
  name : "user",
  initialState,
  reducers : {
    addProfile : (state, action) => {

    },
    addUserRentedProp : (state, action) => {
      state.userRentedProp.push(action.payload)
    },
    addUserSaleProp : (state, action) => {
      state.userSaleProp.push(action.payload)
    }
  }
})

export const {addProfile, addUserRentedProp, addUserSaleProp} = userSlice.actions

export default userSlice.reducer