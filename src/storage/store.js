import { configureStore } from "@reduxjs/toolkit";
import api from "../Utils/Api";
import prdRedr from "./products/productsSlice";
import userRedr from "./user/userSlice";
import singleProductReducer from "./singleProduct/singleProductSlice";
import cartReducer from "./cart/cartSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";


const persistConfig = {
    key: "root",
    storage,
}

const persistedCartReducer = persistReducer(persistConfig, cartReducer);

const store = configureStore({
    reducer: {
         cart: persistedCartReducer,
         products: prdRedr,
         user: userRedr,
         singleProduct: singleProductReducer
    },
    middleware: (getDefaultMiddleware) =>
             getDefaultMiddleware({
                thunk: {
                    extraArgument: api,
                },
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE,REGISTER],
                }
             })
});

export const persistor = persistStore(store);
export default store;