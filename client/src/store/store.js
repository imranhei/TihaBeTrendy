import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./auth-slice"
import adminProductSlice from "./admin/product-slice";
import adminOrderSlice  from "./admin/order-slice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        adminProducts: adminProductSlice,
        adminOrders: adminOrderSlice
    }
});

export default store;