import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Minus, Trash2 } from "lucide-react";
import { useCartStore } from "../store/useCartStore";

const Cart = () => {
  const navigate = useNavigate();
  const cart = useCartStore((state) => state.cart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-black tracking-tighter mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Add some sneakers to your cart to see them here.</p>
        <button
          onClick={() => navigate("/collection")}
          className="px-6 py-3 bg-black text-white uppercase tracking-widest font-bold rounded-full"
        >
          Shop Sneakers
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-black tracking-tighter mb-8">Shopping Cart</h1>

      <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          {cart.map((item) => (
            <div key={`${item._id}-${item.size}`} className="flex flex-col gap-4 rounded-xl border border-gray-200 p-6 lg:flex-row lg:items-center">
              <div className="w-full lg:w-1/4">
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h2 className="text-xl font-black tracking-tight">{item.name}</h2>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">Size {item.size}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id, item.size)}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-black"
                  >
                    <Trash2 size={16} /> Remove
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item._id, item.size, "decrement")}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="min-w-[2rem] text-center font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.size, "increment")}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="text-lg font-black tracking-tight">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-black tracking-tight mb-6">Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-black">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-black">Free</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-3">
              <span className="font-bold uppercase">Total</span>
              <span className="font-black text-lg">${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => alert("Checkout flow not implemented yet")}
            className="mt-8 w-full bg-black text-white py-3 font-black uppercase tracking-widest rounded-full"
          >
            Checkout
          </button>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
