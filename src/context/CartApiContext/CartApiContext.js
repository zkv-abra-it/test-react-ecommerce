import React, { createContext, useEffect, useState } from 'react'
import * as API from '@services/ApiService';
import { addOrReplaceById } from 'src/utils/Utils';

export const CartApiContext = createContext();

export const CartApiContextProvider = ({ children }) => {
    const [cart, setCart] = useState({});
    const [cartItems, setCartItems] = useState([]);
    const [cartQuantity, setCartQuantity] = useState(0);
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        API.getDefaultShoppingList().then(({ data }) => {
            const cartData = data.data;

            if (cartData.length) {
                setCart(cartData[0]);

                API.getShoppingListItems(cartData[0].id).then(({ data }) => {
                    setCartItems(data.data);
                });
            }
        }).then(() => setIsLoading(false))
    }, [])

    useEffect(() => {
        setCartQuantity(cartItems.length);
    }, [cartItems])

    const addItemToCart = (product) => {
        if (Object.keys(cart).length === 0) {
            API.createShoppingList({
                "data": {
                    "type": "shoppinglists",
                    "attributes": {
                        "name": "Shopping List"
                    }
                }
            }).then(({ data }) => {
                setCart(data.data);
                addItem(data.data.id, product);
            });
        } else {
            addItem(cart.id, product)
        }
    }

    function addItem(cartId, product) {
        API.addItemToShoppingList(cartId, {
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
            API.getShoppingList(cartId).then(({ data }) => {
                setCart(data.data);
            })
        });
    }

    const emptyCart = () => {
        if (cart.id) {
            API.deleteShoppingList(cart.id).then(() => {
                setCart({});
                setCartItems([]);
            });
        }
    }

    const updateItemCount = (id, quantity) => {
        API.editShoppingListItem(id, {
            "data": {
              "type": "shoppinglistitems",
              "id": id,
              "attributes": {
                "quantity": quantity
              }
            }
        }).then(({ data }) => {
            const newItem = data.data;

            setCartItems(prev => addOrReplaceById(prev, newItem));
            API.getShoppingList(cart.id).then(({ data }) => {
                setCart(data.data);
            })
        });
    };

    const removeItemFromCart = (itemId) => {
        API.deleteItemFromShoppingList(itemId).then(() => {
            setCartItems(cartItems.filter((cartItem) => cartItem.id !== itemId));

            API.getShoppingList(cart.id).then(({ data }) => {
                setCart(data.data);
            })
        });
    }

    const contextHelperFunctions = {
        cart,
        cartItems,
        isLoading,
        addItemToCart,
        cartQuantity,
        emptyCart,
        updateItemCount,
        removeItemFromCart
    };

    return (
        <CartApiContext.Provider value={contextHelperFunctions}>
            {children}
        </CartApiContext.Provider>
    );
}