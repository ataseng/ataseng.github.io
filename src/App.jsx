import { useEffect, useState } from 'react';
import Home from './pages/Home/Home'
function App() {
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
    <div className="theme-btn">
      <button onClick={() =>setTheme(theme==="dark" ? "light" : "dark")}>{theme}</button>
    </div>
      <Home/>
    </>
  );
}

export default App;
