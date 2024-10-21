import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./auth-slice"
import adminProductSlice from "./admin/product-slice";
import adminOrderSlice  from "./admin/order-slice";
import adminUserSlice from "./admin/user-slice";
import businessSummary from "./admin/dashboard-slice";

import userProductSlice from "./user/product-slice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        adminProducts: adminProductSlice,
        adminOrders: adminOrderSlice,
        adminUsers: adminUserSlice,
        userProducts: userProductSlice,
        businessSummary: businessSummary,
    }
});

export default store;