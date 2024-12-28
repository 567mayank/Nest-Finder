import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  profile : {},
  userRentedProp : [],
  userSaleProp : [],
  sidebarOpen : false,
  chatOpen : false
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
    },
    toggleSideBar : (state, action) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    toggleChatOpen : (state, action) => {
      state.chatOpen = !state.chatOpen
    }
  }
})

export const {addProfile, addUserRentedProp, addUserSaleProp, changeUserAvatar, toggleSideBar, toggleChatOpen} = userSlice.actions

export default userSlice.reducer