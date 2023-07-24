import React, { useContext } from 'react'
import { CartContext } from 'src/context/CartContext/CartContext'
import CartItem from '@components/Cart/CartItem'
import CartTotalPanel from '@components/Cart/CartTotalPanel'

function Cart() {
  const { cartItems, emptyCart } = useContext(CartContext);

  if (!cartItems.length) {
    return (
      <div className="h-screen bg-gray-100 pt-20">
        <h1 className="mb-10 text-center text-2xl font-bold">Empty cart</h1>
      </div>
    )
  }

  return (
    <div className="h-screen bg-gray-100 pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>

      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          <button class="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
            onClick={emptyCart}
          >
            Empty card
          </button>
          {cartItems.map((item) => <CartItem data={item} />)}
        </div>
        <CartTotalPanel />
      </div>
    </div>
  )
}

export default Cart