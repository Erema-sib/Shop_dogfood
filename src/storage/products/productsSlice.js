import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isLiked } from "../../Utils/product_card";
import { SORTED } from "../../Utils/regular";
import { isError } from "../../Utils/store";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async function (
    _,
    { rejectWithValue, fulfillWithValue, dispatch, getState, extra: api }
  ) {
    try {
      const { user } = getState();
      const data = await api.getProductList();
      return fulfillWithValue({ ...data, currentUser: user.data });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchChangeLikeProduct = createAsyncThunk(
  "products/fetchChangeLikeProduct",
  async function (
    product,
    { rejectWithValue, fulfillWithValue, dispatch, getState, extra: api }
  ) {
    try {
      const { user } = getState();

      const liked = isLiked(product.likes, user.data._id);
      const data = await api.changeLikeProduct(product._id, liked);
      return fulfillWithValue({ product: data, liked });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  data: [],
  total: null,
  loading: true,
  error: null,
  favProds: [],
  currentSort: "",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    sortedProducts: (state, action) => {
      switch (action.payload) {
        case SORTED.LOW:
          state.data = state.data.sort((a, b) => b.price - a.price);
          state.currentSort = action.payload;
          break;

        case SORTED.CHEAP:
          state.data = state.data.sort((a, b) => a.price - b.price);
          state.currentSort = action.payload;
          break;

        case SORTED.SALE:
          state.data = state.data.sort((a, b) => b.discount - a.discount);
          state.currentSort = action.payload;
          break;

        default:
          state.data = state.data.sort((a, b) => b.discount - a.discount);
          state.currentSort = SORTED.SALE;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const { products, total, currentUser } = action.payload;
        state.data = products;
        state.favProds = products.filter((i) =>
          isLiked(i.likes, currentUser._id)
        );
        state.total = total;
        state.loading = false;
      })
      .addCase(fetchChangeLikeProduct.fulfilled, (state, action) => {
        const { liked, product } = action.payload;

        state.data = state.data.map((c) => {
          return c._id === product._id ? product : c;
        });

        if (!liked) {
          state.favProds.push(product);
        } else {
          state.favProds = state.favProds.filter(
            (card) => card._id !== product._id
          );
        }
      })
      .addMatcher(isError, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      });
  },
});

export const { sortedProducts } = productsSlice.actions;
export default productsSlice.reducer;
