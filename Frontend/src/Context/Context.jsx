import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Loading from "../Components/Loading";
import { useNavigate } from "react-router-dom";
export const Context = createContext({
  isLoggedin : 0,
  checkUser : () => {},
  isLoading : true,
  curPage : "/",
  changeCurPage : () => {}
})

export const ContextProvider = ({children}) => {
  const [isLoggedin,setIsLoggedin] = useState(0)
  const [isLoading,setIsLoading] = useState(true)
  const [curPage,setCurPage] = useState("/")
  const navigate = useNavigate()

  const checkUser = async() => {
    setIsLoading(true)
    try {
      const response = await axios.get(`http://localhost:${import.meta.env.VITE_APP_PORT}/user/isLoggedin`, { withCredentials: true });
      if(response.data.isLoggedin) localStorage.setItem("User",JSON.stringify(response.data.user))
      setIsLoggedin(response.data.isLoggedin)
    } catch (error) {
      setIsLoggedin(1)
      console.error(error)
    } finally{
      setIsLoading(false)
    }
  }

  useEffect(()=>{
    if(isLoggedin) navigate(curPage)
  },[isLoggedin])

  const changeCurPage = (path) => {
    setCurPage(path)
  }

  useEffect(()=>{
    checkUser()
  },[])


  return (
    <Context.Provider value={{isLoggedin,checkUser,isLoading,changeCurPage}}>
      {isLoading && <Loading/>}
      {children}
    </Context.Provider>
  );
}