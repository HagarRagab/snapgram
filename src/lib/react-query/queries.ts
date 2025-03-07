import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    createNewAccount,
    createPost,
    getRecentPosts,
    likePost,
    savePost,
    unSavePost,
    signInAccount,
    signout,
    getCurrentUser,
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

export function useGetCurrentUser() {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
        queryFn: getCurrentUser,
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

export function useLikePost() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            postId,
            likesArray,
        }: {
            postId: string;
            likesArray: string[];
        }) => likePost(postId, likesArray),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER], //!
            });
        },
    });
}

export function useSavePost() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ postId, userId }: { postId: string; userId: string }) =>
            savePost(postId, userId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER],
            });
        },
    });
}

export function useUnSavePost() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ savedRecordId }: { savedRecordId: string }) =>
            unSavePost(savedRecordId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER],
            });
        },
    });
}
