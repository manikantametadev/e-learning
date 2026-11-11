
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen w-full overflow-hidden">
      <div className="app-shell flex h-screen w-full overflow-hidden rounded-none">

        {/* Fixed Sidebar */}
        <Sidebar
          open={open}
          onClose={() => setOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">

          {/* Sticky Header */}
          <div className="sticky top-0 z-50 shrink-0">
            <Header onMenu={() => setOpen(true)} />
          </div>

          {/* Scrollable Content */}
          <main className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden bg-[#111116] p-5 md:p-8">
            <Outlet />
            <Footer />
          </main>

        </div>
      </div>
    </div>
  );
}
