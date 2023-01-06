import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isError } from "../../Utils/store";

export const fetchSingleProduct = createAsyncThunk(
  "singleProduct/fetchSingleProduct",
  async function (
    productId,
    { rejectWithValue, fulfillWithValue, extra: api }
  ) {
    try {
      const data = await api.getProductById(productId);

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchCreateReview = createAsyncThunk(
  "singleProduct/fetchCreateReview",
  async function (
    { productId, data: body_info },
    { rejectWithValue, fulfillWithValue, extra: api }
  ) {
    try {
      const data = await api.createReviewProduct(productId, body_info);

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = { data: {}, loading: true, error: null };

const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState,
  reducers: {
    setProductState: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleProduct.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })

      .addCase(fetchCreateReview.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })

      .addMatcher(isError, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setProductState } = singleProductSlice.actions;

export default singleProductSlice.reducer;
