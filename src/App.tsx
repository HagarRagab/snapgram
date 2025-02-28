import { Routes, Route } from "react-router";
import "./globals.css";
import SigninForm from "./_auth/forms/SigninForm";
import SingupForm from "./_auth/forms/SingupForm";
import { Home } from "./_root/pages";
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
        </main>
    );
}

export default App;
