import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // ADD PRODUCT TO CART
  function addToCart(product) {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id,
      );

      // Product already exists
      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      // New product
      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  }

  // PLUS +
  function increaseQuantity(id) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  }

  // MINUS -
  function decreaseQuantity(id) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  // TOTAL PRICE
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // TOTAL NUMBER OF ITEMS
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        totalPrice,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
//Cart Page مش هي الـ  CartProvider .
// هي بس المكان اللي رح يمسك ويحافظ على
// cart data المشتركة.
// أما:
// Cart.jsx
//data هي الصفحة اللي بتعرض هيدي

// cart = الـ actual shared data
// CartProvider = Component بيمتلك ويدير cart state
// CartContext = الـ channel اللي من خلاله منشارك البيانات
// useContext() = React Hook بيقرأ البيانات من الـ Context
// useCart() = Custom Hook عملناه كـ shortcut بدل ما نكتب useContext(CartContext) كل مرة
// children = كل JSX موجود جوّا <CartProvider>...</CartProvider>
// value = الأشياء اللي الـ Provider قرر يشاركها مع الـ Components اللي تحته
