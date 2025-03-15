import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App";
import AuthProvider from "./context/AuthContext";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <App />
                    <ReactQueryDevtools initialIsOpen={false} />
                </AuthProvider>
            </QueryClientProvider>
        </BrowserRouter>
    </StrictMode>
);
