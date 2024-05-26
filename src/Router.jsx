import {
    createBrowserRouter
} from "react-router-dom";
import App from './App';
import "./assets/css/style.css";
import NotFound from "./pages/NotFound/NotFound";
import Events from './pages/Events/Events';
import Home from './pages/Home/Home';
import Competitions from './pages/Events/Competitions/Competitions';
import Competition from "./pages/Events/Competitions/Competition/Competition";
import Certificate from "./pages/Events/Competitions/Certificate/Certificate";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <NotFound />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/events",
                element: <Events />
            },
            {
                path: "/events/competitions",
                element: <Competitions />
            },
            {
                path: "/events/competitions/1",
                element: <Competition title="1. Geleneksel Algoritma Yarışması" />
            },
            {
                path: "/events/competitions/1/certificate/:teamId/:memberSlug",
                element: <Certificate />,
                loader: async ({ params }) => {
                    return params;
                }
            }
        ]
    }

]);