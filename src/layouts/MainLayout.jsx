import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer/Footer'; 
import Sidebar from '../components/Sidebar/Sidebar';

const MainLayout = ({ children }) => { 
  
  const getStoredTheme = localStorage.getItem("theme") || ""
  
  const [theme, setTheme] = useState(getStoredTheme)

  const changeTheme = (newTheme) => {
    const previousTheme = localStorage.getItem("theme")
    if(previousTheme){
      document.body.classList.remove(previousTheme)
    }
    if(newTheme){
      document.body.classList.add(newTheme)
      localStorage.setItem("theme",newTheme)
    }
  }

  useEffect(() => {
    changeTheme(theme)
  },[theme])
  return (
    <>
        <Sidebar theme={theme} setTheme={setTheme}/>
        
        <main>
            {children}       
        </main>
        <Footer theme={theme}  />
    </>
  );
}

export default MainLayout;
