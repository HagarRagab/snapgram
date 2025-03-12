import { Routes, Route } from "react-router";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";
import {
    AllUsers,
    CreatePost,
    Explore,
    Home,
    LikedPosts,
    PostDetails,
    Profile,
    Saved,
    UpdateProfile,
} from "./_root/pages";
import SigninForm from "./_auth/forms/SigninForm";
import SingupForm from "./_auth/forms/SingupForm";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import EditPost from "./_root/pages/EditPost";
import ProtectedRoute from "./_root/pages/ProtectedRoute";
import ProfilePosts from "./_root/pages/ProfilePosts";

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
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/saved" element={<Saved />} />
                    <Route path="/all-users" element={<AllUsers />} />
                    <Route path="/create-post" element={<CreatePost />} />
                    <Route path="/update-post/:id" element={<EditPost />} />
                    <Route path="/posts/:id" element={<PostDetails />} />
                    <Route path="/profile/:id" element={<Profile />}>
                        <Route index element={<ProfilePosts />} />
                        <Route
                            path="/profile/:id/liked-posts"
                            element={
                                <ProtectedRoute>
                                    <LikedPosts />
                                </ProtectedRoute>
                            }
                        />
                    </Route>
                    <Route
                        path="/update-profile/:id"
                        element={<UpdateProfile />}
                    />
                </Route>
            </Routes>

            <Toaster />
        </main>
    );
}

export default App;
