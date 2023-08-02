import React from 'react'
import { Link } from 'react-router-dom'

function CartTotalPanel({ total }) {
    return (
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">${total}</p>
            </div>
            <div className="my-2 flex justify-between">
                <p className="text-gray-700">Shipping</p>
                <p className="text-gray-700">$0</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                    <p className="mb-1 text-lg font-bold">${total} USD</p>
                </div>
            </div>
            <Link to="/checkout">
                <button className="mt-6 w-full rounded-md bg-zinc-700 py-1.5 font-medium text-white hover:bg-zinc-600">
                    Check out
                </button>
            </Link>
        </div>
    )
}

export const CartTotalPanelMemo = React.memo(CartTotalPanel);