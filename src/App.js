import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Navbar from '@components/Navbar/Navbar';
import Cart from 'src/pages/Cart/Cart';
import CatalogLoader from 'src/pages/Catalog/Catalog';
import { CartApiContextProvider } from '@context/CartApiContext/CartApiContext';
import { AuthContextProvider } from '@context/AuthContext/AuthContext';
import Checkout from '@pages/Checkout/Checkout';
import LoginForm from '@pages/Login/Login';

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
                            <Route path="/checkout" element={<Checkout />}></Route>
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