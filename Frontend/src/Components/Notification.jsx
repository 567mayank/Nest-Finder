import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeMsg } from '../Redux/userSlice';

const Notification = () => {
  const message = useSelector((state) => state.user.message)
  const dispatch = useDispatch()

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(changeMsg(""))
    }, 5000);

    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div
      className={`fixed top-12 left-1/2 transform -translate-x-1/2 max-w-xs md:max-w-lg w-full p-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out bg-gray-100 z-50`}
    >
      <div className="flex gap-x-3 items-center">
        <button
          className="text-xl font-bold text-black focus:outline-none" onClick={() => dispatch(changeMsg(""))}
        >
          ×
        </button>
        <span className="text-sm font-semibold text-blue-600">{message}</span>
      </div>
    </div>
  );
};

export default Notification;
