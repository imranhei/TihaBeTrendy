import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./sidebar";
import AdminHeader from "./header";

const AdminLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      {/* admin sidebar */}
      <AdminSidebar open={openSidebar} setOpenSidebar={setOpenSidebar} />
      <div className="flex flex-1 flex-col overflow-x-auto">
        {/* admin header */}
        <AdminHeader setOpenSidebar={setOpenSidebar} />
        <main className="flex-1 flex flex-col bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;