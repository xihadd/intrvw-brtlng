import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

export type CartItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

export interface CartState {
    cart: CartItem[];
    itemsInCart: number;
}

const initialState: CartState = {
  cart: [],
  itemsInCart: 0
};

export const filterSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const itemToAdd = action.payload;
      const existingItem = state.cart.find(item => item.id === itemToAdd.id);
      if (existingItem) {
        existingItem.quantity += itemToAdd.quantity;
      } else {
        state.cart.push(itemToAdd);
      }
      state.itemsInCart += itemToAdd.quantity;
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      const itemToRemove = state.cart.find(item => item.id === action.payload);
      if (itemToRemove) {
        state.itemsInCart -= itemToRemove.quantity;
        state.cart = state.cart.filter(item => item.id !== action.payload);
      }
    }
  },
});

export const { addItemToCart, removeItemFromCart } = filterSlice.actions;

export default filterSlice.reducer;
