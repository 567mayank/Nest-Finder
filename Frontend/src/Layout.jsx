import React from 'react';
import { Outlet } from 'react-router-dom'; 
import Header from './Components/Header';
import Footer from './Components/Footer';
import Sidebar from './Components/SideBar';
import { SocketProvider } from './SocketContext';

const Layout = () => {
  return (
    <SocketProvider>
      <Header/>
      <main className=' mt-20'>
        <Sidebar/>
        <Outlet />
      </main>
      {/* <Footer/> */}
    </SocketProvider>
  );
};

export default Layout;
