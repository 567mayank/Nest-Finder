import React, { useEffect, useState } from 'react';
import Contact from '../Components/Chat/Contact';
import ChatSection from '../Components/Chat/ChatSection';
import { backend, isLoggedin } from '../Helper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading';
import { useSelector, useDispatch } from 'react-redux'
import { addContacts } from '../Redux/chatSlice';

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate() 

  const [isLoading,setIsLoading] = useState(false)
  
  const chatSecOpen = useSelector((state) => state.msg.chatIsOpen)

  const chatRedux = useSelector((state) => state.chat.contacts) 
  


  // fetching contacts
  const retrieveData = async () => {
    // setIsLoading(true)
    // try {
    //   const response = await axios.get(
    //     `${backend}/chat/allUserChat`,
    //     {
    //       withCredentials: true,
    //     }
    //   );
    //   dispatch(addContacts(response.data.conversations))
    // } catch (error) {
    //   console.error('Error in fetching Chats', error);
    // } finally {
    //   setIsLoading(false)
    // }
  };

  useEffect(() => {
    if (chatRedux.length === 0) 
      retrieveData()
  }, [chatRedux, dispatch])


  useEffect(()=>{
    if(!isLoggedin()) {
      navigate("/")
      return
    }
  },[isLoggedin])

  return (
    <div className='lg:ml-64 lg:flex lg:w-1/4 lg:min-h-[650px] lg:absolute lg:right-4 lg:bottom-10 bg-blue-100'>
      {/* Conditional rendering for contact list */}
      {isLoading && <Loading/>}
      <div
        className={`w-full  bg-red-100 lg:border-r lg:border-zinc-600 ${
          chatSecOpen ? 'hidden' : 'block'
        }`}
      >
        <Contact/>
      </div>

      <div
        className={`w-full bg-blue-100 ${
          chatSecOpen ? 'block' : 'hidden'
        }`}
      >
        <ChatSection/>
      </div>
    </div>
  );
}

export default App;