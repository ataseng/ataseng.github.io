import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import { Outlet } from "react-router-dom";

function App() {
    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default App;
