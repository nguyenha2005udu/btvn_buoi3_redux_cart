import {createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type { CartItem, Product } from "../../types/product";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    // Thêm sản phẩm vào giỏ
    addItem: (state, action: PayloadAction<Product>) => {
      const product = action.payload;

      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          product,
          quantity: 1,
        });
      }
    },

    // Xóa sản phẩm khỏi giỏ
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      );
    },

    // Cập nhật số lượng sản phẩm
    updateQuantity: (
      state,
      action: PayloadAction<{
        id: number;
        quantity: number;
      }>
    ) => {
      const { id, quantity } = action.payload;

      const item = state.items.find(
        (item) => item.product.id === id
      );

      if (!item) return;

      if (quantity <= 0) {
        state.items = state.items.filter(
          (item) => item.product.id !== id
        );
      } else {
        item.quantity = quantity;
      }
    },

    // Xóa toàn bộ giỏ hàng
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;