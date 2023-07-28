import React, { createContext, useEffect, useState } from 'react'
import { getShoppingList, deleteItemFromShoppingList, deleteShoppingList, getDefaultShoppingList, createShoppingList, addItemToShoppingList, getShoppingListItems } from '@services/ApiService';
import { addOrReplaceById } from 'src/utils/Utils';

export const CartApiContext = createContext();

export const CartApiContextProvider = ({ children }) => {
    const [cart, setCart] = useState({});
    const [cartItems, setCartItems] = useState([]);
    const [cartQuantity, setCartQuantity] = useState(0);

    useEffect(() => {
        getDefaultShoppingList().then(({ data }) => {
            const cartData = data.data;

            if (cartData.length) {
                setCart(cartData[0]);

                getShoppingListItems(cartData[0].id).then(({ data }) => {
                    setCartItems(data.data);
                });
            }
        })
    }, [])

    useEffect(() => {
        setCartQuantity(cartItems.length);
    }, [cartItems])

    const addItemToCart = (product) => {
        if (Object.keys(cart).length === 0) {
            createShoppingList({
                "data": {
                    "type": "shoppinglists",
                    "attributes": {
                        "name": "Shopping List"
                    }
                }
            }).then(({ data }) => {
                setCart(data.data);
            });
        } else {
            addItemToShoppingList(cart.id, {
                "data": [
                    {
                        "type": "shoppinglistitems",
                        "attributes": {
                            "quantity": 1
                        },
                        "relationships": {
                            "product": {
                                "data": {
                                    "type": "products",
                                    "id": product.id
                                }
                            },
                            "unit": {
                                "data": {
                                    "type": "productunits",
                                    "id": product.unit
                                }
                            }
                        }
                    }
                ]
            }).then(({ data }) => {
                const newItem = data.data[0];

                setCartItems(prev => addOrReplaceById(prev, newItem));
                getShoppingList(cart.id).then(({ data }) => {
                    setCart(data.data);
                })
            });
        }
    }

    const emptyCart = () => {
        if (cart.id) {
            deleteShoppingList(cart.id).then(() => {
                setCart({});
                setCartItems({});
            });
        }
    }

    const increaseItemCount = () => {

    };

    const decreaseItemCount = () => {

    };

    const removeItemFromCart = (itemId) => {
        deleteItemFromShoppingList(itemId).then(() => {
            setCartItems(cartItems.filter((cartItem) => cartItem.id !== itemId));

            getShoppingList(cart.id).then(({ data }) => {
                setCart(data.data);
            })
        });
    }

    const contextHelperFunctions = {
        cart,
        cartItems,
        addItemToCart,
        cartQuantity,
        emptyCart,
        increaseItemCount,
        decreaseItemCount,
        removeItemFromCart
    };

    return (
        <CartApiContext.Provider value={contextHelperFunctions}>
            {children}
        </CartApiContext.Provider>
    );
}