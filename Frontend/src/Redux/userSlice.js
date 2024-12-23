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
      state.profile = action.payload
    },
    addUserRentedProp : (state, action) => {
      state.userRentedProp.push(action.payload)
    },
    addUserSaleProp : (state, action) => {
      state.userSaleProp.push(action.payload)
    },
    changeUserAvatar : (state, action) => {
      state.profile.avatar = action.payload
    }
  }
})

export const {addProfile, addUserRentedProp, addUserSaleProp, changeUserAvatar} = userSlice.actions

export default userSlice.reducer