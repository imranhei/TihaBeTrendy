import BusinessReport from "@/components/admin-view/business-report";
import { Separator } from "@/components/ui/separator";
import {
  BadgeDollarSign,
  ChartNoAxesCombined,
  ChartSpline,
  HandCoins,
  ShoppingBasket,
  ShoppingCart,
  Truck,
} from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBusinessSummary } from "@/store/admin/dashboard-slice";
import QuickViewCard from "./quick-view-card";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { dashboardData } = useSelector((state) => state.businessSummary);

  // console.log(dashboardData);

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    dispatch(getBusinessSummary(token));
  }, [dispatch]);

  return (
    <div className="flex sm:gap-6 gap-2 flex-wrap justify-center sm:justify-start">
      <QuickViewCard
        header="Total Products"
        text="Types (In Stock)"
        icon={<ShoppingBasket className="text-violet-600 sm:w-12 sm:h-12 w-10 h-10" />}
        value={dashboardData?.totalProducts}
      />
      <QuickViewCard
        header="Total Delivered"
        text="Quantity"
        icon={<Truck className="text-violet-600 sm:w-12 sm:h-12 w-10 h-10" />}
        value={dashboardData?.totalDelivered}
      />
      <QuickViewCard
        header="Revenue"
        text="Total sold"
        icon={<BadgeDollarSign className="text-violet-600 sm:w-12 sm:h-12 w-10 h-10" />}
        value={dashboardData?.totalRevenue}
      />
      <QuickViewCard
        header="Earning"
        icon={<HandCoins className="text-violet-600 sm:w-12 sm:h-12 w-10 h-10" />}
        value={dashboardData?.currentProfit}
      />
      <QuickViewCard
        header="Total Invest"
        icon={<ChartSpline className="text-violet-600 sm:w-12 sm:h-12 w-10 h-10" />}
        value={dashboardData?.totalInvest}
      />
      <QuickViewCard
        header="Total Profit"
        icon={<ChartNoAxesCombined className="text-violet-600 sm:w-12 sm:h-12 w-10 h-10" />}
        value={dashboardData?.totalProfit}
      />

      <Separator />
      <BusinessReport />
    </div>
  );
};

export default AdminDashboard;
