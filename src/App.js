import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Navbar from '@components/Navbar/Navbar';
import Cart from '@components/Cart/Cart';
import CatalogLoader from '@components/Catalog/CatalogLoader';
import { CartApiContextProvider } from '@context/CartApiContext/CartApiContext';
import OrderCreatorForm from '@components/OrderCreatorForm/OrderCreatorForm';
import LoginForm from '@components/LoginForm/LoginForm';

function App() {
    return (
        <div className="App min-h-screen">
            <CartApiContextProvider>
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<CatalogLoader />}></Route>
                        <Route path="/cart" element={<Cart />}></Route>
                        <Route path="/checkout" element={<OrderCreatorForm />}></Route>
                        <Route path="/login" element={<LoginForm />}></Route>
                        <Route path="*"element={<Navigate to="/" replace />}/>
                    </Routes>
                </BrowserRouter>
            </CartApiContextProvider>
        </div>
    );
}

export default App;