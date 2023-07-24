import React, { useContext, useEffect } from 'react';
import { CartContext } from 'src/context/CartContext/CartContext'
import { Link } from 'react-router-dom';

function CartWidget() {
    const { cartQuantity } = useContext(CartContext);

    return (
        <div className="flex items-center">
            <Link
                className="hidden-arrow mr-4 flex items-center text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                to="/cart">
                <span className="[&>svg]:w-5">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5">
                        <path
                            d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                    </svg>
                </span>
                {
                cartQuantity > 0 && 
                <span className="absolute -mt-2.5 ml-2 rounded-[0.37rem] bg-red-600 px-[0.45em] py-[0.2em] text-[0.6rem] leading-none text-white">
                    {cartQuantity}
                </span>
                }
            </Link>
        </div>
    )
}

export default CartWidget;