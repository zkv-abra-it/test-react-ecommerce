import React, { useContext } from 'react'
import { CartApiContext } from '@context/CartApiContext/CartApiContext'
import CartItem from '@components/Cart/CartItem'
import { CartTotalPanelMemo } from '@components/Cart/CartTotalPanel'
import Loading from '@components/Loading/Loading';

function Cart() {
	const { cart, cartItems, isLoading, emptyCart } = useContext(CartApiContext);

	if (isLoading) {
        return <Loading />
    }

	if (cartItems.length === 0) {
		return (
			<div className="bg-gray-100 py-20">
				<h1 className="mb-10 text-center text-2xl font-bold">Empty cart</h1>
			</div>
		)
	}

	return (
		<div className="bg-gray-100 pt-20">
			<h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>

			<div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
				<div className="rounded-lg md:w-2/3">
					<button className="mb-6 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
						onClick={emptyCart}
					>
						Empty card
					</button>

					{cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)}
				</div>
				<CartTotalPanelMemo total={cart.attributes.total} />
			</div>
		</div>
	)
}

export default Cart