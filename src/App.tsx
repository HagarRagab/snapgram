import { Routes, Route } from "react-router";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";
import { Home } from "./_root/pages";
import SigninForm from "./_auth/forms/SigninForm";
import SingupForm from "./_auth/forms/SingupForm";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";

function App() {
    return (
        <main className="flex h-screen">
            <Routes>
                {/* Public Routes */}
                <Route element={<AuthLayout />}>
                    <Route path="/signin" element={<SigninForm />} />
                    <Route path="/signup" element={<SingupForm />} />
                </Route>

                {/* Private Routes */}
                <Route element={<RootLayout />}>
                    <Route index element={<Home />} />
                </Route>
            </Routes>

            <Toaster />
        </main>
    );
}

export default App;
