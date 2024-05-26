import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    RouterProvider,
} from "react-router-dom";
import { router } from './Router';
import "boxicons";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);