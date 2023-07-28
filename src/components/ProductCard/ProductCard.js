import React, { useContext } from 'react'
import { CartApiContext } from '@context/CartApiContext/CartApiContext'

function ProductCard(props) {
    const { id, name, price, img } = props.data;
    const cartApiContext = useContext(CartApiContext);

    const addItemToCart = (e, product) => {
        e.preventDefault();
        cartApiContext.addItemToCart(product);
    }

    return (
        <a className="group" key={id} onClick={(e) => addItemToCart(e, props.data)}>
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7" >
                <img src={img} alt="catalog product" className="h-full w-full object-cover object-center group-hover:opacity-75" />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{name}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">${price}</p>
        </a>
    )
}

export default ProductCard