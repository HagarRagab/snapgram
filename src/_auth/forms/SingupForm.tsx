"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { signinValidationSchema } from "@/lib/validation/index";
import Loader from "@/components/shared/Loader";
import { Link } from "react-router";
import createNewAccount from "@/lib/appwrite/api";

function SigninForm() {
    const isLoading = false;

    // 1. Define your form.
    const form = useForm<z.infer<typeof signinValidationSchema>>({
        resolver: zodResolver(signinValidationSchema),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: "",
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof signinValidationSchema>) {
        const newUser = await createNewAccount(values);
        console.log(newUser);
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
                        {isLoading ? (
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

export default SigninForm;
