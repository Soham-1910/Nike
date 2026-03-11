import { create } from 'zustand';
import { products } from '../assets/index'; // Importing your sneaker array
import { toast } from 'react-toastify'; // Optional: for "Added to Cart" alerts

const useShopStore = create((set, get) => ({
    products: products,
    currency: '$',
    delivery_fee: 10,
    cartItems: {},

    // Add item to cart
    addToCart: (itemId) => {
        let cartData = { ...get().cartItems };

        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }

        set({ cartItems: cartData });
        toast.success("Added to cart!");
    },

    // Get total count of items in cart
    getCartCount: () => {
        let totalCount = 0;
        const cartItems = get().cartItems;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalCount += cartItems[item];
            }
        }
        return totalCount;
    },

    // Update quantity of an item
    updateQuantity: (itemId, quantity) => {
        let cartData = { ...get().cartItems };
        cartData[itemId] = quantity;
        set({ cartItems: cartData });
    },

    // Calculate total amount
    getCartAmount: () => {
        let totalAmount = 0;
        const cartItems = get().cartItems;
        const allProducts = get().products;

        for (const item in cartItems) {
            let itemInfo = allProducts.find((product) => product._id === item);
            try {
                if (cartItems[item] > 0) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            } catch (error) {
                console.log(error);
            }
        }
        return totalAmount;
    }
}));

export default useShopStore;