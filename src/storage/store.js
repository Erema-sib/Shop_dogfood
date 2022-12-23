import { configureStore } from "@reduxjs/toolkit";
import api from "../Utils/Api";
import prdRedr from "./products/productsSlice";
import userRedr from "./user/userSlice";
import singleProductReducer from "./singleProduct/singleProductSlice";


const store = configureStore({
    reducer: {
         products: prdRedr,
         user: userRedr,
         singleProduct: singleProductReducer
    },
    middleware: (getDefaultMiddleware) =>
             getDefaultMiddleware({
                thunk: {
                    extraArgument: api,
                }
             })
});

export default store;