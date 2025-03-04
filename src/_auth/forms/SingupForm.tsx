"use client";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Loader from "@/components/shared/Loader";
import { signupValidationSchema } from "@/lib/validation/index";
import { useCreateAccount, useSignInAccount } from "@/lib/react-query/queries";
import { useAuthContext } from "@/context/AuthContext";

function SignupForm() {
    const { mutateAsync: createNewAccount, isPending: isCreatingUser } =
        useCreateAccount();
    const { mutateAsync: signInAccount } = useSignInAccount();

    const { checkAuthUser, isLoading: isLoggingIn } = useAuthContext();

    const navigate = useNavigate();

    // 1. Define form
    const form = useForm<z.infer<typeof signupValidationSchema>>({
        resolver: zodResolver(signupValidationSchema),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: "",
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof signupValidationSchema>) {
        try {
            const newUser = await createNewAccount(values);

            if (!newUser) return toast("Sign up was failed. Please try again.");

            const session = await signInAccount({
                email: values.email,
                password: values.password,
            });

            if (!session) {
                toast("Sign in was failed. Please try again.");
                navigate("/signin");
                return;
            }

            const isLoggedIn = await checkAuthUser();

            if (isLoggedIn) {
                form.reset();
                navigate("/");
            } else return toast("Sign in was failed. Please try again.");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Form {...form}>
            <div className="sm:w-420 flex-center flex-col">
                <img
                    src="/assets/images/logo.svg"
                    alt="logo"
                    className="self-center"
                />
                <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
                    Create a new account
                </h2>
                <p className="text-light-3 small-medium md:base-regular mt-2">
                    To use snapgram, please enter your account details
                </p>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-5 w-full mt-4"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        className="shad-input"
                                        type="text"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input
                                        className="shad-input"
                                        type="text"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        className="shad-input"
                                        type="email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        className="shad-input"
                                        type="password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="shad-button_primary">
                        {isCreatingUser || isLoggingIn ? (
                            <div className="flex-center gap-2">
                                <Loader />
                                Loading...
                            </div>
                        ) : (
                            "Sign up"
                        )}
                    </Button>
                    <p className="text-sm text-light-2 text-center">
                        Already have an account{" "}
                        <Link
                            to="/signin"
                            className="text-sm text-primary-500 font-semibold ml-1"
                        >
                            Log in
                        </Link>
                    </p>
                </form>
            </div>
        </Form>
    );
}

export default SignupForm;
