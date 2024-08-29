import { useEffect, useState } from "react";
import EducationPage from "./pages/Education/EducationPage";

function App() {
  const getStoredTheme = localStorage.getItem("theme") || "";

  const [theme, setTheme] = useState(getStoredTheme);

  const ChangeTheme = (newTheme) => {
    const previousTheme = localStorage.getItem("theme");
    if (previousTheme) {
      document.body.classList.remove(previousTheme);
    }
    if (newTheme) {
      document.body.classList.add(newTheme);
      localStorage.setItem("theme", newTheme);
    }
  };

  useEffect(() => {
    ChangeTheme(theme);
  }, [theme]);

  return (
    <>
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        style={{ border: "none", outline: "none" }}
      >
        {theme === "dark" ? <h2>Light</h2> : <h2>Dark</h2>}
      </button>

      <EducationPage/>
    </>
  );
}

export default App;
