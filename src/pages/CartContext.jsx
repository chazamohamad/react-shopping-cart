import { createContext, useContext, useEffect, useState } from "react";

import API from "../services/api";

import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();

  const [cart, setCart] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);

  const [loading, setLoading] = useState(false);

  // GET CART FROM DATABASE

  const getCart = async () => {
    if (!user) {
      setCart([]);

      setTotalPrice(0);

      return;
    }

    try {
      setLoading(true);

      const response = await API.get(`/api/cart/${user.id}`);

      setCart(response.data.products);

      setTotalPrice(response.data.totalPrice);
    } catch (error) {
      // if user has no cart yet

      setCart([]);

      setTotalPrice(0);
    } finally {
      setLoading(false);
    }
  };

  // LOAD CART WHEN USER CHANGES

  useEffect(() => {
    getCart();
  }, [user]);

  // ADD PRODUCT

  const addToCart = async (product) => {
    if (!user) {
      return;
    }

    try {
      await API.post(
        "/api/cart",

        {
          userId: user.id,

          productId: product.id,

          quantity: 1,
        },
      );

      await getCart();
    } catch (error) {
      console.log(error);
    }
  };

  // INCREASE QUANTITY

  const increaseQuantity = async (productId) => {
    if (!user) return;

    const item = cart.find((item) => item.productId._id === productId);

    if (!item) return;

    const newQuantity = item.quantity + 1;

    try {
      await API.put(
        `/api/cart/${user.id}/${productId}`,

        {
          quantity: newQuantity,
        },
      );

      // update UI directly without refresh

      setCart((prevCart) =>
        prevCart.map((item) =>
          item.productId._id === productId
            ? {
                ...item,
                quantity: newQuantity,
              }
            : item,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  // DECREASE QUANTITY

  const decreaseQuantity = async (productId) => {
    if (!user) return;

    const item = cart.find((item) => item.productId._id === productId);

    if (!item) return;

    if (item.quantity === 1) {
      removeFromCart(productId);

      return;
    }

    const newQuantity = item.quantity - 1;

    try {
      await API.put(
        `/api/cart/${user.id}/${productId}`,

        {
          quantity: newQuantity,
        },
      );

      setCart((prevCart) =>
        prevCart.map((item) =>
          item.productId._id === productId
            ? {
                ...item,
                quantity: newQuantity,
              }
            : item,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  // REMOVE PRODUCT

  const removeFromCart = async (productId) => {
    if (!user) return;

    try {
      await API.delete(`/api/cart/${user.id}/${productId}`);

      setCart((prevCart) =>
        prevCart.filter((item) => item.productId._id !== productId),
      );
    } catch (error) {
      console.log(error);
    }
  };

  // CLEAR CART

  const clearCart = async () => {
    if (!user) return;

    try {
      await API.delete(`/api/cart/clear/${user.id}`);

      setCart([]);

      setTotalPrice(0);
    } catch (error) {
      console.log(error);
    }
  };

  // CALCULATE TOTAL PRICE

  useEffect(() => {
    const total = cart.reduce(
      (sum, item) => sum + item.productId.price * item.quantity,

      0,
    );

    setTotalPrice(total);
  }, [cart]);

  // TOTAL ITEMS

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,

    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,

        addToCart,

        increaseQuantity,

        decreaseQuantity,

        removeFromCart,

        clearCart,

        totalPrice,

        totalItems,

        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
