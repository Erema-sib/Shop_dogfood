import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isError } from "../../Utils/store";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async function (
    _,
    { rejectWithValue, fulfillWithValue, dispatch, getState, extra: api }
  ) {
    try {
      const data = await api.getUserInfo();
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
// Аутентификация
export const userAuthantic = createAsyncThunk(
  "user/userAuthantic",
  async function (
    dataAuth,
    { rejectWithValue, fulfillWithValue, dispatch, getState, extra: api }
  ) {
    try {
      const data = await api.authorize(dataAuth);
      if (data.token) {
        localStorage.setItem("token", JSON.stringify(data.token));
      } else {
        return rejectWithValue(data);
      }
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Регистрация
export const userRegistr = createAsyncThunk(
  "user/userRegistr",
  async function (
    dataRegistr,
    { rejectWithValue, fulfillWithValue, dispatch, getState, extra: api }
  ) {
    try {
      const data = await api.register(dataRegistr);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Проверка токена
export const userTokenCheck = createAsyncThunk(
  "user/userTokenCheck",
  async function (
    token,
    { rejectWithValue, fulfillWithValue, dispatch, getState, extra: api }
  ) {
    try {
      const data = await api.checkToken(token);
      dispatch(authCheck());
      dispatch(loggedIn());
      return fulfillWithValue(data);
    } catch (error) {
      localStorage.clear();
      return rejectWithValue(error);
    } finally {
      dispatch(authCheck());
    }
  }
);

const initialState = {
  isAuthChecked: false,
  loggedIn: false,
  data: null,
  userError: null,
  getRequest: true,
  requestLogin: false,
  requestRegister: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authCheck: (state) => {
      state.isAuthChecked = true;
    },
    loggedIn: (state) => {
      state.loggedIn = true;
    },
    logout: (state) => {
      state.data = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.getRequest = true;
        state.userError = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.getRequest = false;
      })

      .addCase(userAuthantic.pending, (state) => {
        state.requestLogin = true;
        state.userError = null;
      })

      .addCase(userAuthantic.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.requestLogin = false;
        state.loggedIn = true;
      })

      .addCase(userRegistr.pending, (state) => {
        state.requestRegister = true;
        state.userError = null;
      })

      .addCase(userRegistr.fulfilled, (state, action) => {
        state.data = action.payload;
        state.requestRegister = false;
      })

      .addCase(userTokenCheck.pending, (state) => {
        state.getRequest = true;
        state.userError = null;
      })

      .addCase(userTokenCheck.fulfilled, (state, action) => {
        state.data = action.payload;
        state.getRequest = false;
      })
      .addMatcher(isError, (state, action) => {
        state.userError = action.payload;
        state.getRequest = false;
        state.requestLogin = false;
        state.requestRegister = false;
      });
  },
});

export const { authCheck, logout, loggedIn } = userSlice.actions;

export default userSlice.reducer;
