import React, { createContext, useContext, useEffect, useState } from 'react'
import { ApiContext } from 'src/context/ApiContext/ApiContext';

export const CartApiContext = createContext({
    cart: [],
    addItemToCart: () => {}
});

export const CartApiContextProvider = ({ children }) => {
    const { getDefaultShoppingList, createShoppingListWithItem, addItemToShoppingList } = useContext(ApiContext);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        getDefaultShoppingList().then(cart => {
            console.log(cart.data[0]);
            setCart(cart.data[0]);
        })
    }, [])
    
    const addItemToCart = (product) => {
        console.log(cart);

        if (cart.length) {
            addItemToShoppingList(cart.id, {
                "data": {
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
            }).then(item => {
                console.log(item);
            });
        } else {
            createShoppingListWithItem({
                "data": {
                    "type": "shoppinglistitems",
                    "attributes": {
                        "quantity": 1
                    },
                    "relationships": {
                        "shoppingList": {
                            "data": {
                                "type": "shoppinglists",
                                "id": "default"
                            }
                        },
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
            }).then(item => {
                console.log(item);
            });
        }
    }

    return (
        <CartApiContext.Provider value={{ cart, addItemToCart }}>
          {children}
        </CartApiContext.Provider>
      ); 
}