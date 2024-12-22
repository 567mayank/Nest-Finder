import {configureStore} from '@reduxjs/toolkit'
import dataReducer from "../Redux/dataSlice"
import favouriteReducer from "../Redux/favouriteSlice"

export const store = configureStore({
  reducer: {
    data: dataReducer,
    favourite : favouriteReducer
  },
})