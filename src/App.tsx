import { lazy } from "react";
import { Routes, Route } from "react-router";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";
// import AuthLayout from "./_auth/AuthLayout";
// import SigninForm from "./_auth/forms/SigninForm";
// import SingupForm from "./_auth/forms/SingupForm";
// import RootLayout from "./_root/RootLayout";
// import {
//     Home,
//     Explore,
//     Saved,
//     AllUsers,
//     CreatePost,
//     LikedPosts,
//     PostDetails,
//     Profile,
//     EditPost,
//     UpdateProfile,
//     ProtectedRoute,
//     ProfilePosts,
//     PageNotFound,
// } from "./_root/pages";

const AuthLayout = lazy(() => import("./_auth/AuthLayout"));
const SigninForm = lazy(() => import("./_auth/forms/SigninForm"));
const SingupForm = lazy(() => import("./_auth/forms/SingupForm"));
const RootLayout = lazy(() => import("./_root/RootLayout"));
const Home = lazy(() => import("./_root/pages/Home"));
const Explore = lazy(() => import("./_root/pages/Explore"));
const Saved = lazy(() => import("./_root/pages/Saved"));
const AllUsers = lazy(() => import("./_root/pages/AllUsers"));
const CreatePost = lazy(() => import("./_root/pages/CreatePost"));
const LikedPosts = lazy(() => import("./_root/pages/LikedPosts"));
const PostDetails = lazy(() => import("./_root/pages/PostDetails"));
const Profile = lazy(() => import("./_root/pages/Profile"));
const EditPost = lazy(() => import("./_root/pages/EditPost"));
const UpdateProfile = lazy(() => import("./_root/pages/UpdateProfile"));
const ProtectedRoute = lazy(() => import("./_root/pages/ProtectedRoute"));
const ProfilePosts = lazy(() => import("./_root/pages/ProfilePosts"));
const PageNotFound = lazy(() => import("./_root/pages/PageNotFound"));

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
                <Route path="*" element={<PageNotFound />} />
            </Routes>

            <Toaster />
        </main>
    );
}

export default App;
