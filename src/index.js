
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./assets/css/style.css";
import { BrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { Provider } from 'react-redux';
import store from './redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId="1023553605205-qkbpdfs12sirr97gnovku3dgjshe8nrr.apps.googleusercontent.com">
        <Provider store={store}>
        <BrowserRouter>
            <MainLayout>
                <App />
            </MainLayout>
        </BrowserRouter>
    </Provider>
    </GoogleOAuthProvider>
    // <Provider store={store}>
    //     <BrowserRouter>
    //         <MainLayout>
    //             <App />
    //         </MainLayout>
    //     </BrowserRouter>
    // </Provider>
);