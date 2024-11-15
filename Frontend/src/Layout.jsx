// Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom'; 
import Header from './Components/Header';
import Footer from './Components/Footer';
import Sidebar from './Components/SideBar';
import { ContextProvider } from './Context/Context';
const Layout = () => {
  return (
    <ContextProvider>
      <div>
        <Header/>
        <main className='min-h-screen mt-20'>
          <Sidebar/>
          <Outlet />
        </main>
        {/* <Footer/> */}
      </div>
    </ContextProvider>
  );
};

export default Layout;
