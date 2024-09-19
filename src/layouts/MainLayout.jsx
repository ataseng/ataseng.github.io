import React from 'react';
import Footer from '../components/Footer/Footer'; 

const MainLayout = ({ themeName, children }) => { 
  return (
    <>
        <main>
            {children}
        </main>
      <Footer themeName={themeName} />
    </>
  );
}

export default MainLayout;
