import { Suspense } from "react";
import { Outlet } from "react-router";

import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Topbar from "@/components/shared/Topbar";
import LoaderFullPage from "@/components/shared/LoaderFullPage";

function RootLayout() {
    return (
        <div className="w-full md:flex">
            <Topbar />
            <LeftSidebar />
            <section className="flex flex-1 h-full">
                <Suspense fallback={<LoaderFullPage />}>
                    <Outlet />
                </Suspense>
            </section>
            <Bottombar />
        </div>
    );
}

export default RootLayout;
