import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: [],
  // Selector to get total cart quantity
  cartCount: (state) => {
    return state.cart.reduce((total, item) => total + item.quantity, 0);
  },
  // Add product to cart
  addToCart: (product, token, showToast) => {
    if (!token) {
      showToast({
        title: "Not Logged In",
        description: "You need to be logged in to add items to the cart!",
        status: "error",
        isClosable: true,
      });
      return;
    } else {
      showToast({
        title: "Success",
        description: "You have successfully added the item to the cart!",
        status: "success",
        isClosable: true,
      });
    }

    set((state) => {
      console.log("Current cart state:", state.cart);

      const existingProduct = state.cart.find(
        (item) => item._id === product._id
      );
      if (existingProduct) {
        console.log("Product already in cart, updating quantity");
        return {
          cart: state.cart.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      console.log("Adding new product to cart");
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    });
  },

  // Remove product from cart
  removeFromCart: (_id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item._id !== _id),
    })),

  // Update product quantity
  updateQuantity: (_id, quantity) =>
    set((state) => {
      const newQuantity = quantity === "" ? 0 : parseInt(quantity, 10); // If empty, set to 0
      if (newQuantity < 0) return state; // Don't allow negative quantities

      return {
        cart: state.cart.map((item) =>
          item._id === _id ? { ...item, quantity: newQuantity } : item
        ),
      };
    }),

  // Clear the cart
  clearCart: () => set({ cart: [] }),
}));
