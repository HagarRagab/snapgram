import {
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
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
    getPostById,
    updatePost,
    deletePost,
    getPosts,
    getUsers,
    getUserById,
    updateUser,
    followUser,
    unFollowUser,
    getFollowersFollowings,
} from "../appwrite/api";
import { INewPost, INewUser, IUpdatePost, IUpdateUser } from "@/types";
import { toast } from "sonner";
import { QUERY_KEYS } from "./queryKeys";
import { Models } from "appwrite";

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

export function useGetUserById(id?: string) {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID, id],
        queryFn: () => getUserById(id),
        enabled: !!id,
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
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
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

export function useGetPostById(postId?: string) {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
        queryFn: () => getPostById(postId),
        enabled: !!postId, // incase there is no postId enabled will be false to disable automatic refetching
    });
}

export function useUpdatePost() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ newPost }: { newPost: IUpdatePost }) =>
            updatePost(newPost),
        onSuccess: () => {
            toast("Post updated successfully.");
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
            });
        },
        onError: () => toast("Updating post failed. Please try again."),
    });
}

export function useDeletePost() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            postId,
            imageId,
        }: {
            postId?: string;
            imageId?: string;
        }) => deletePost(postId, imageId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
            });
            toast("Post deleted successfully.");
        },
        onError: () => toast("Post deletion failed. Please try again."),
    });
}

export function useGetPosts({
    limits,
    searchTerm,
}: {
    limits: number;
    searchTerm?: string;
}) {
    return useInfiniteQuery({
        queryKey: searchTerm
            ? [QUERY_KEYS.SEARCH_POSTS, searchTerm]
            : [QUERY_KEYS.GET_INFINITE_POSTS],
        queryFn: ({ pageParam }: { pageParam?: number }) =>
            getPosts(limits, searchTerm, pageParam),
        getNextPageParam: (lastPage: Models.Document | undefined) => {
            // Note that getInfinitePosts returns (e.g., { documents: Post[], total: number })
            if (lastPage?.documents?.length === 0) return null;
            const lastPost = lastPage?.documents?.at(-1);
            return lastPost?.$id;
        },
    });
}

export function useGetUsers() {
    return useInfiniteQuery({
        queryKey: [QUERY_KEYS.GET_USERS],
        queryFn: ({ pageParam }: { pageParam?: number }) => getUsers(pageParam),
        getNextPageParam: (lastPage: Models.Document | undefined) => {
            if (lastPage?.documents.length === 0) return null;
            const lastPost = lastPage?.documents?.at(-1);
            return lastPost.$id;
        },
    });
}

export function useUpdateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ newInfo }: { newInfo: IUpdateUser }) =>
            updateUser(newInfo),
        onSuccess: (data) => {
            toast("Your info updated successfully!");
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_USER_BY_ID],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_USERS],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_USER_BY_ID, data?.$id],
            });
        },
        onError: () => toast("Failed to updated your info. Please try again."),
    });
}

export function useFollowUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            followerId,
            followingId,
        }: {
            followerId: string;
            followingId?: string;
        }) => followUser(followerId, followingId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_FOLLOWINGS_BY_USER_ID],
                exact: false,
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_FOLLOWERS_BY_USER_ID],
                exact: false,
            });
        },
    });
}

export function useUnFollowUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ documentId }: { documentId?: string }) =>
            unFollowUser(documentId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_FOLLOWINGS_BY_USER_ID],
                exact: false,
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_FOLLOWERS_BY_USER_ID],
                exact: false,
            });
        },
        onError: () => toast("Something went wrong. Please try again later."),
    });
}

export function useGetFollowers(query: string, id?: string) {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_FOLLOWERS_BY_USER_ID, id],
        queryFn: () => getFollowersFollowings(query, id),
    });
}

export function useGetFollowings(query: string, id?: string) {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_FOLLOWINGS_BY_USER_ID, id],
        queryFn: () => getFollowersFollowings(query, id),
    });
}
