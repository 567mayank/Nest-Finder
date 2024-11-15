import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const Context = createContext({
  isLoggedin : false,
  checkUser : () => {}
})

export const ContextProvider = ({children}) => {
  const [isLoggedin,setIsLoggedin] = useState(false)
  const checkUser = async() => {
    try {
      const response = await axios.get(`http://localhost:${import.meta.env.VITE_APP_PORT}/user/isLoggedin`, { withCredentials: true });
      if(response.data.isLoggedin) localStorage.setItem("User",JSON.stringify(response.data.user))
      setIsLoggedin(response.data.isLoggedin)
    } catch (error) {
      setIsLoggedin(false)
      console.error(error)
    }
  }
  useEffect(()=>{
    checkUser()
  },[])
  return (
    <Context.Provider value={{isLoggedin,checkUser}}>
      {children}
    </Context.Provider>
  );
}