
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./assets/css/style.css";
import { BrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { Provider } from 'react-redux';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <MainLayout>
                    <App />
                </MainLayout>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);