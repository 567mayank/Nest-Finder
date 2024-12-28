import React, { useEffect, useState } from 'react';
import Contact from '../Components/Chat/Contact';
import ChatSection from '../Components/Chat/ChatSection';
import { backend, isLoggedin } from '../Helper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading';
import { useSelector, useDispatch } from 'react-redux'
import { addContacts } from '../Redux/chatSlice';
import { addProfile } from '../Redux/userSlice';

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate() 

  const [isLoading,setIsLoading] = useState(false)
  
  const chatSecOpen = useSelector((state) => state.msg.chatIsOpen)

  const chatRedux = useSelector((state) => state.chat.contacts) 
  
  const UserRedux = useSelector((state) => state.user.profile)


  // fetching contacts
  const retrieveData = async () => {
    // setIsLoading(true)
    try {
      const response = await axios.get(
        `${backend}/chat/allUserChat`,
        {
          withCredentials: true,
        }
      );
      dispatch(addContacts(response.data.conversations))
    } catch (error) {
      console.error('Error in fetching Chats', error);
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    if (chatRedux.length === 0) 
      retrieveData()
  }, [chatRedux, dispatch])


  const dataRetriever = async() => {
    try {
      const response = await axios.get(`${backend}/user/userInfo`,{withCredentials : true})
      dispatch(addProfile(response.data.user))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=>{
    if (Object.keys(UserRedux).length === 0) {
      dataRetriever()
    }
  },[UserRedux, dispatch])


  useEffect(()=>{
    if(!isLoggedin()) {
      navigate("/")
      return
    }
  },[isLoggedin])

  return (
    <div className='lg:ml-64 lg:flex lg:w-1/4 h-screen lg:h-[650px] lg:absolute lg:right-4 lg:bottom-10 '>
      {/* Conditional rendering for contact list */}
      {isLoading && <Loading/>}
      <div
        className={`w-full ${
          chatSecOpen ? 'hidden' : 'block'
        }`}
      >
        <Contact/>
      </div>

      <div
        className={`w-full  ${
          chatSecOpen ? 'block' : 'hidden'
        }`}
      >
        <ChatSection/>
      </div>
    </div>
  );
}

export default App;