import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from '@components/Navbar/Navbar';
import SampleProductListing from '@components/SampleProductListing/SampleProductListing'
import Cart from '@components/Cart/Cart';
import { CartContextProvider } from 'src/context/CartContext/CartContext';

function App() {
    return (
        <div className="App">
            <CartContextProvider>
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<SampleProductListing />}></Route>
                        <Route path="/cart" element={<Cart />}></Route>
                    </Routes>
                </BrowserRouter>
            </CartContextProvider>
        </div>
    );
}

export default App;