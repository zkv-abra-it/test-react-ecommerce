import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from '@components/Navbar/Navbar';
import ProductListing from '@components/ProductListing/ProductListing'
import Cart from '@components/Cart/Cart';
import TestCatalog from '@components/TestCatalog/TestCatalog';
import { CartContextProvider } from 'src/context/CartContext/CartContext';
import { ApiContextProvider } from 'src/context/ApiContext/ApiContext';

function App() {
    return (
        <div className="App">
            
            <ApiContextProvider>
                <CartContextProvider>
                    <BrowserRouter>
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<ProductListing />}></Route>
                            <Route path="/test" element={<TestCatalog />}></Route>
                            <Route path="/cart" element={<Cart />}></Route>
                        </Routes>
                    </BrowserRouter>
                </CartContextProvider>
            </ApiContextProvider>
        </div>
    );
}

export default App;