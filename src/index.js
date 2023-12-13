import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/login';
import Auth from './auth/auth';
import ProtectedRoute from './util/ProtectedRoute';
import Home from './Pages/home';
import NotFound from './Pages/notFound';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename={'/'}>
    <Routes>
        <Route path='/auth' element={<Auth />}>
            <Route path='login' element={<Login />} />
        </Route>
        <Route path="/" element={<App />}>
            <Route path='' element={
                <ProtectedRoute>
                    <Home />
                </ProtectedRoute>
            } />
        </Route>
        <Route path="*" element={<NotFound/>}>
          
        </Route>
    </Routes>
</BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);