import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Navbar from '@components/Navbar/Navbar';
import Cart from '@components/Cart/Cart';
import CatalogLoader from '@components/Catalog/CatalogLoader';
import { CartApiContextProvider } from '@context/CartApiContext/CartApiContext';
import { AuthContextProvider } from '@context/AuthContext/AuthContext';
import CheckoutForm from '@components/CheckoutForm/CheckoutForm';
import LoginForm from '@components/LoginForm/LoginForm';

function App() {
    return (
        <div className="App min-h-screen">
            <AuthContextProvider>
                <CartApiContextProvider>
                    <BrowserRouter>
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<CatalogLoader />}></Route>
                            <Route path="/cart" element={<Cart />}></Route>
                            <Route path="/checkout" element={<CheckoutForm />}></Route>
                            <Route path="/login" element={<LoginForm />}></Route>
                            <Route path="*"element={<Navigate to="/" replace />}/>
                        </Routes>
                    </BrowserRouter>
                </CartApiContextProvider>
            </AuthContextProvider>
        </div>
    );
}

export default App;