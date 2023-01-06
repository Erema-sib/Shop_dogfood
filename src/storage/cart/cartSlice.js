import { createSelector, createSlice } from "@reduxjs/toolkit";
import { calcDiscountPrice } from "../../Utils/product_card";

const initialState = {
  data: [],
};

const selectCart = (state) => state.cart;

export const cartInfoSel = createSelector(selectCart, (cart) => {
  return cart.data.reduce(
    (total, product) => {
      const priceDiscount = calcDiscountPrice(product.price, product.discount);

      total.totalCount += product.quantity;
      total.amount += product.price * product.quantity;
      total.totalDiscount += (product.price - priceDiscount) * product.quantity;
      total.amountWithDiscount += priceDiscount * product.quantity;

      return total;
    },
    {
      amountWithDiscount: 0,
      totalDiscount: 0,
      amount: 0,
      totalCount: 0,
    }
  );
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      const productCart = state.data.find(
        (product) => product._id === action.payload._id
      );
      if (productCart) {
        productCart.quantity++;
      } else {
        state.data.push({ ...action.payload, quantity: 1 });
      }
    },
    addCartAfterChange: (state, action) => {
      const productCart = state.data.find(
        (product) => product._id === action.payload._id
      );
      if (productCart && action.payload.quantity > 0) {
        productCart.quantity = action.payload.quantity;
      } else {
        state.data.push({
          ...action.payload,
          quantity: action.payload.quantity,
        });
      }
    },
    increaseByOne: (state, action) => {
      const productCart = state.data.find(
        (product) => product._id === action.payload._id
      );
      if (productCart) {
        productCart.quantity++;
      } else {
        state.data.push({ ...action.payload, quantity: 1 });
      }
    },
    decreaseByOne: (state, action) => {
      const productCart = state.data.find(
        (product) => product._id === action.payload._id
      );
      if (productCart.quantity <= 1) {
        productCart.quantity = 1;
      } else {
        productCart.quantity--;
      }
    },
    removeProduct: (state, action) => {
      state.data = state.data.filter(
        (product) => product._id !== action.payload._id
      );
    },
  },
});

export const {
  addCart,
  increaseByOne,
  decreaseByOne,
  removeProduct,
  addCartAfterChange,
} = cartSlice.actions;

export default cartSlice.reducer;
