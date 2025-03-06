import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Models } from "appwrite";

import { PostValidationSchema } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import FileUploader from "../shared/FileUploader";
import { Input } from "../ui/input";
import { useCreatePost } from "@/lib/react-query/queries";
import { useAuthContext } from "@/context/AuthContext";

// This post prop exists only when updating post
function PostForm({ post }: { post: Models.Document }) {
    const { mutateAsync: createPost, isPending: isCreatingPost } =
        useCreatePost();

    const { user } = useAuthContext();
    const navigate = useNavigate();

    // 1. Define your form.
    const form = useForm<z.infer<typeof PostValidationSchema>>({
        resolver: zodResolver(PostValidationSchema),
        defaultValues: {
            caption: post ? post.caption : "",
            file: [],
            location: post ? post.location : "",
            tags: post ? post.tags : "",
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof PostValidationSchema>) {
        try {
            const newPost = await createPost({
                ...values,
                userId: user.id,
            });

            if (!newPost) throw Error;

            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col w-full max-w-5xl gap-9"
            >
                <FormField
                    control={form.control}
                    name="caption"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">
                                Caption
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    className="custom-scrollbar shad-textarea"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">
                                Add Photos
                            </FormLabel>
                            <FormControl>
                                <FileUploader
                                    fieldChange={field.onChange}
                                    imageUrl={post?.imageUrl} // This only for updating post
                                />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">
                                Add Location
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    className="shad-input"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">
                                Add Tags (separated by comma " , ")
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Art, Expression, Learn"
                                    type="text"
                                    className="shad-input"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

                <div className="flex gap-4 justify-end items-center">
                    <Button
                        type="button"
                        className="shad-button_dark-4"
                        disabled={isCreatingPost}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="shad-button_primary"
                        disabled={isCreatingPost}
                    >
                        {isCreatingPost ? "Creating..." : "Submit"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}

export default PostForm;
