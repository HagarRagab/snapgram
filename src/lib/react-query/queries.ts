import { useMutation } from "@tanstack/react-query";
import { createNewAccount, signInAccount, signout } from "../appwrite/api";
import { INewUser } from "@/types";

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
