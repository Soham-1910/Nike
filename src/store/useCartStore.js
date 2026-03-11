import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  cart: [],

  // Add an item, or increment quantity if already in cart (match _id + size)
  addToCart: (product, size = "M") => {
    set((state) => {
      const existingIndex = state.cart.findIndex(
        (item) => item._id === product._id && item.size === size
      );

      if (existingIndex !== -1) {
        const nextCart = [...state.cart];
        nextCart[existingIndex] = {
          ...nextCart[existingIndex],
          quantity: nextCart[existingIndex].quantity + 1,
        };
        return { cart: nextCart };
      }

      const nextItem = {
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        size,
        quantity: 1,
      };

      return { cart: [...state.cart, nextItem] };
    });
  },

  // Remove one item entirely from cart
  removeFromCart: (productId, size) => {
    set((state) => ({
      cart: state.cart.filter(
        (item) => !(item._id === productId && item.size === size)
      ),
    }));
  },

  // Change quantity up or down (type = "increment" | "decrement")
  updateQuantity: (productId, size, type) => {
    set((state) => {
      const nextCart = state.cart.map((item) => {
        if (item._id === productId && item.size === size) {
          const nextQty = type === "increment" ? item.quantity + 1 : item.quantity - 1;
          return { ...item, quantity: Math.max(1, nextQty) };
        }
        return item;
      });

      return { cart: nextCart };
    });
  },

  // Derived state: total items (sum of quantities)
  totalItems: () => get().cart.reduce((sum, item) => sum + item.quantity, 0),
}));
