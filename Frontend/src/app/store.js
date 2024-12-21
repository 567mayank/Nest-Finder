import {configureStore} from '@reduxjs/toolkit'
import dataReducer from "../Redux/dataSlice"

export const store = configureStore({
  reducer: {
    data: dataReducer,
  },
})