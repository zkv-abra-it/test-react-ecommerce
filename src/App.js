import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from '@components/Navbar/Navbar';
import Cart from '@components/Cart/Cart';
import CatalogLoader from '@components/Catalog/CatalogLoader';
import { CartApiContextProvider } from '@context/CartApiContext/CartApiContext';

function App() {
    return (
        <div className="App">
            <CartApiContextProvider>
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<CatalogLoader />}></Route>
                        <Route path="/cart" element={<Cart />}></Route>
                    </Routes>
                </BrowserRouter>
            </CartApiContextProvider>
        </div>
    );
}

export default App;