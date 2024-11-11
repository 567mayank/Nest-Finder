// Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom'; 
import Header from './Components/Header';
import Footer from './Components/Footer';
const Layout = () => {
  return (
    <div>
      <Header/>
      <main className='min-h-screen mt-20'>
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default Layout;
