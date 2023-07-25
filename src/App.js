import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from '@components/Navbar/Navbar';
import Cart from '@components/Cart/Cart';
import CatalogLoader from '@components/Catalog/CatalogLoader';
import { CartApiContextProvider } from 'src/context/CartApiContext/CartApiContext';
import { ApiContextProvider } from 'src/context/ApiContext/ApiContext';

function App() {
    return (
        <div className="App">
            
            <ApiContextProvider>
                <CartApiContextProvider>
                    <BrowserRouter>
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<CatalogLoader />}></Route>
                            <Route path="/cart" element={<Cart />}></Route>
                        </Routes>
                    </BrowserRouter>
                </CartApiContextProvider>
            </ApiContextProvider>
        </div>
    );
}

export default App;