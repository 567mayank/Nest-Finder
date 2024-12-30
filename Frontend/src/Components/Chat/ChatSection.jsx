import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { FaPaperPlane, FaArrowLeft } from 'react-icons/fa';
import { backend } from '../../Helper';
import { useSocketUser } from '../../SocketContext';
import Messages from './Messages';
import { useSelector, useDispatch } from 'react-redux';
import { addNotification } from '../../Redux/chatSlice';
import { toggleChatIsOpen } from '../../Redux/msgSlice';

function ChatSection() {
  const dispatch = useDispatch();
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState(null);
  const { socket } = useSocketUser();
  const user = useSelector((state) => state.user.profile);
  const chatIdRef = useRef(null);
  const reciever = useSelector((state) => state.msg.chatUser);
  const isOpen = useSelector((state) => state.msg.chatIsOpen);

  // Reset states when chat is closed
  useEffect(() => {
    if (isOpen) return;

    setMessageInput('');
    setMessages(null);
    chatIdRef.current = null;
  }, [isOpen]);

  // Listen for new messages when chat is closed
  useEffect(() => {
    if (isOpen) return;

    socket.on('msg-backend', (msg) => {
      dispatch(addNotification(msg.msg.conversationId)); // For adding count in Redux when chat is unopened
    });

    return () => {
      socket.off('msg-backend');
    };
  }, [isOpen, socket, dispatch]);

  // Fetching messages
  useEffect(() => {
    if (!isOpen) return;

    const retrieveMsg = async () => {
      try {
        const response = await axios.get(
          `${backend}/chat/getAllMsg/${reciever.chatId}`,
          { withCredentials: true }
        );

        setMessages(response.data.chat.messages);
        chatIdRef.current = response.data.chat._id;

        startSocket();

        // Mark messages as seen
        await axios.put(
          `${backend}/chat/markSeenAllMsg/${reciever._id}`,
          {},
          { withCredentials: true }
        );
      } catch (error) {
        console.error('Error in fetching messages', error);
      }
    };
    retrieveMsg();
  }, [isOpen, reciever]);

  // Initialize socket listener
  const startSocket = () => {
    if (!isOpen || !chatIdRef.current) return;

    const handleNewMessage = ({ msg, msgId }) => {
      if (!isOpen) return;
      msg.status = 'Read';
      if (msg.conversationId === chatIdRef.current) {
        setMessages((prevMessages) => [...prevMessages, msg]);
        readMsg(msgId);
      }
    };

    socket.on('msg-backend', handleNewMessage);

    return () => {
      socket.off('msg-backend', handleNewMessage);
    };
  };

  // Mark a message as 'read' in the database
  const readMsg = async (msgId) => {
    try {
      await axios.put(
        `${backend}/chat/markSeen/${msgId}`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error('Error in updating seen of single message', error);
    }
  };

  // Sending a message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!isOpen || !chatIdRef.current || !messageInput) return;

    const msg = {
      msg: messageInput,
      sender: user._id,
      reciever: reciever._id,
      conversationId: chatIdRef.current,
      createdAt: new Date(),
      status: 'Sent',
    };

    socket.emit('msg', msg);
    setMessages((prevMessages) => [...prevMessages, msg]);
    setMessageInput('');
  };

  return (
    <div className="h-full w-full bg-[#392a35] flex flex-col md:rounded-xl md:rounded-br-none">
      {isOpen ? (
        <>
          {/* Header */}
          <div className="bg-[#1A1A1D] text-white p-4 flex items-center space-x-3 border-b border-zinc-500 rounded-t-xl">
            <button
              className="text-white hover:text-gray-400 mr-4"
              onClick={() => dispatch(toggleChatIsOpen())}
            >
              <FaArrowLeft size={20} />
            </button>
            <img
              src={reciever?.property.media[0]}
              alt={reciever?.userName}
              className="rounded-full w-12 h-12 object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold">{reciever?.property.title}</h3>
              <h1>Sender: {reciever?.fullName}</h1>
            </div>
          </div>

          {/* Messages Section */}
          <Messages messages={messages} user={user} />

          {/* Input Section */}
          <form
            onSubmit={handleSendMessage}
            className="bg-[#1A1A1D] p-4 flex items-center space-x-3 border-t border-zinc-600 rounded-b-xl"
          >
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#353592]"
              placeholder="Type a message..."
            />
            <button
              type="submit"
              className="bg-[#070105] text-white p-2 rounded-lg hover:bg-[#392a35] transition-colors border border-white"
            >
              <FaPaperPlane />
            </button>
          </form>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full bg-[#392a35] text-white">
          <div className="text-4xl font-semibold text-center mb-6">
            Start Your Chat
          </div>
          <div className="text-lg text-center mb-4">
            Connect with friends and start chatting now!
          </div>
          <div className="bg-[#e782b5] text-[#392a35] px-6 py-3 rounded-full text-xl hover:bg-[#e965a7] transition-all">
            Get Started
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatSection;
