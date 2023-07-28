import React, { useContext, useState, useEffect } from 'react'
import { CartApiContext } from '@context/CartApiContext/CartApiContext'
import CartItem from '@components/Cart/CartItem'
import CartTotalPanel from '@components/Cart/CartTotalPanel'
import { getProduct, getImages } from '@services/ApiService';
import Loading from '@components/Loading/Loading';

function Cart() {
	const { cart, cartItems, emptyCart } = useContext(CartApiContext);
	const [isLoading, setIsLoading] = useState(true);
	const [items, setItems] = useState([]);

	const initProducts = async (cartItems) => {
		let _items = items;
		setItems([]);

		cartItems.forEach((cartItem) => {
			let _item = _items.find((_item) => _item.id === cartItem.relationships.product.data.id)
			if (_item !== undefined) {
				setItems(prev => [
					...prev,
					{
						..._item,
						quantity: cartItem.attributes.quantity
					}
				]);
			} else {
				getProduct(cartItem.relationships.product.data.id, {'include': 'images', 'fields[products]': 'name,prices,unit,images'}).then(({ data }) => {
					const product = data.data;
					const productImages = data.included.filter(inncludeItem => inncludeItem.type === 'productimages');
                	const cartImage = productImages.find(productImage => productImage.dimension === 'product_original');
					const imageSrc = process.env.REACT_APP_API_URL + '/' + cartImage.url;

					setItems(prev => [
						...prev,
						{
							id: product.id,
							name: product.attributes.name,
							price: product.attributes.prices[0].price,
							quantity: cartItem.attributes.quantity,
							img: imageSrc
						}
					]);
				})
			}
		})
	}

	useEffect(() => {
		initProducts(cartItems).then(() => {setIsLoading(false);})
	}, [cartItems])

	if (isLoading) {
        return <Loading />
    }

	if (Object.keys(cart).length === 0) {
		return (
			<div className="bg-gray-100 pt-20">
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
					{items.map((item, i) => <CartItem key={i} product={item} />)}
				</div>
				<CartTotalPanel />
			</div>
		</div>
	)
}

export default Cart