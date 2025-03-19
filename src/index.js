
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./assets/css/style.css";
import { BrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <MainLayout>
                <App />
            </MainLayout>
        </BrowserRouter>
    </React.StrictMode>
);