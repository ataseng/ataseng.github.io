import React from 'react';
import Footer from '../components/Footer/Footer'; 

const MainLayout = ({ themeName, children }) => { 
  return (
    <>
      {children}
      <Footer themeName={themeName} />
    </>
  );
}

export default MainLayout;
