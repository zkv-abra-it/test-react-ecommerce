import React, { createContext } from 'react'
import { useLocalStorage } from '@hooks/useLocalStorage/useLocalStorage';

export const CartContext = createContext({
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  increaseItemCount: () => {},
  decreaseItemCount: () => {},
  emptyCart: () => {},
  cartQuantity: 0,
  cartTotal: 0
});


export const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage('cartItems', []);

  const addItemToCart = (productCard) => {

    if (cartItems.some((cartItem) => cartItem.id === productCard.id)) {
      increaseItemCount(productCard.id)
    } else {
      setCartItems([
        ...cartItems,
        {
          id: productCard.id,
          name: productCard.name,
          price: productCard.price,
          quantity: 1,
          img: productCard.img
        }
      ]);
    }
  };

  const removeItemFromCart = (itemId) => {
    setCartItems(cartItems.filter((cartItem) => cartItem.id !== itemId));
  };

  const increaseItemCount = (itemId) => {
    setCartItems(cartItems.map((cartItem) => 
      cartItem.id === itemId
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    ));
  };

  const decreaseItemCount = (itemId) => {
    const quantity = cartItems.find((cartItem) => cartItem.id === itemId).quantity;

    if (quantity === 1) {
      removeItemFromCart(itemId);
    } else {
      setCartItems(cartItems.map((cartItem) => 
        cartItem.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      ));
    }
  };

  const cartQuantity = cartItems.reduce((result, cartItem) => result + cartItem.quantity, 0);
  const cartTotal = cartItems.reduce((result, cartItem) => result + cartItem.quantity * cartItem.price, 0);

  const emptyCart = () => {
    setCartItems([]);
  };

  const contextHelperFunctions = {
    cartItems,
    addItemToCart,
    removeItemFromCart,
    increaseItemCount,
    decreaseItemCount,
    emptyCart,
    cartQuantity,
    cartTotal
  };

  return (
    <CartContext.Provider value={contextHelperFunctions}>
      {children}
    </CartContext.Provider>
  );
}