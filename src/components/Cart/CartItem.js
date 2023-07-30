import React, { useContext, useEffect, useState } from 'react'
import { CartApiContext } from '@context/CartApiContext/CartApiContext';
import { getProduct } from '@services/ApiService';

function CartItem({ cartItem }) {
    const { updateItemCount, removeItemFromCart } = useContext(CartApiContext);
    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const productId = cartItem.relationships.product.data.id;

    useEffect(() => {
        getProduct(productId, { 'include': 'images', 'fields[products]': 'name,unit,images' })
            .then(({ data }) => {
                const product = data.data;
                const productImages = data.included.find(inncludeItem => inncludeItem.type === 'productimages')?.attributes?.files;
                const cartImage = productImages.find(productImage => productImage.dimension === 'product_original');
                const imageSrc = process.env.REACT_APP_API_URL + '/' + cartImage.url;

                setProduct({
                    name: product.attributes.name,
                    imgSrc: imageSrc
                });
            }).then(() => {
                setIsLoading(false)
            })
    }, [productId])

    const handleChangeQuantity = (quantity) => {
        if (quantity > 0) {
            updateItemCount(cartItem.id, quantity);
        } else {
            removeItemFromCart(cartItem.id);
        }
    }

    if (isLoading) return null;

    return (
        <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
            <img src={product.imgSrc} alt="cartitem" className="w-full rounded-lg sm:w-40" />
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">{product.name}</h2>
                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center border-gray-100">
                        <span onClick={() => handleChangeQuantity(cartItem.attributes.quantity - 1)} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                        <span className="w-8 text-center text-xs outline-none">{cartItem.attributes.quantity}</span>
                        <span onClick={() => handleChangeQuantity(cartItem.attributes.quantity + 1)} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <p className="text-sm">${cartItem.attributes.value * cartItem.attributes.quantity}</p>
                        <svg onClick={() => removeItemFromCart(cartItem.id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem