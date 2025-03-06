import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    createNewAccount,
    createPost,
    getRecentPosts,
    signInAccount,
    signout,
} from "../appwrite/api";
import { INewPost, INewUser } from "@/types";
import { toast } from "sonner";
import { QUERY_KEYS } from "./queryKeys";

export function useCreateAccount() {
    return useMutation({
        mutationFn: (user: INewUser) => createNewAccount(user),
    });
}

export function useSignInAccount() {
    return useMutation({
        mutationFn: (user: { email: string; password: string }) =>
            signInAccount(user),
    });
}

export function useSignout() {
    return useMutation({
        mutationFn: signout,
    });
}

export function useCreatePost() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newPost: INewPost) => createPost(newPost),
        onSuccess: () => {
            toast("Post created successfully");
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
            });
        },
        onError: () =>
            toast("Creating post was failed. Please try again later."),
    });
}

export function useGetRecentPosts() {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        queryFn: getRecentPosts,
    });
}
