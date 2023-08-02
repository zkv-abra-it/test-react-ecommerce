import React, { useContext } from 'react'
import { AuthContext } from '@context/AuthContext/AuthContext';
import CheckoutAuth from './CheckoutAuth';
import CheckoutGuest from './CheckoutGuest';
import { useNavigate } from "react-router-dom";
import { CartApiContext } from '@context/CartApiContext/CartApiContext'
import Loading from '@components/Loading/Loading';

export default function Checkout() {
    const { isAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const { cartItems, isLoading } = useContext(CartApiContext);

    if (isLoading) {
        return <Loading />
    }

    if (cartItems.length === 0) {
        navigate('/cart', { replace: true });
    }

    if (isAuth) {
        return <CheckoutAuth />
    }

    return  <CheckoutGuest />
}
