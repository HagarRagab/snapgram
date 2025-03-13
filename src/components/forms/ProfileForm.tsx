import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Models } from "appwrite";

import { useUpdateUser } from "@/lib/react-query/queries";
import { ProfileValidationSchema } from "@/lib/validation";
import { useAuthContext } from "@/context/AuthContext";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FileUploader from "@/components/shared/FileUploader";

type ProfileFormProps = {
    // user: IUser;
    user: Models.Document;
};

function ProfileForm({ user }: ProfileFormProps) {
    const { mutateAsync: updateUser, isPending: isUpdatingUser } =
        useUpdateUser();
    const { user: currentUser, setUser } = useAuthContext();
    const navigate = useNavigate();

    // 1. Define your form.
    const form = useForm<z.infer<typeof ProfileValidationSchema>>({
        resolver: zodResolver(ProfileValidationSchema),
        defaultValues: {
            file: [],
            name: user?.name,
            username: user?.username,
            email: user?.email,
            bio: user?.bio || "",
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof ProfileValidationSchema>) {
        const updatedUser = await updateUser({
            newInfo: {
                userId: user.$id,
                name: values.name,
                bio: values.bio,
                imageId: user.imageId,
                imageUrl: user.imageUrl,
                file: values.file,
            },
        });

        if (!updatedUser) return;

        setUser({
            ...currentUser,
            name: updatedUser?.name,
            imageUrl: updatedUser?.imageUrl,
            bio: updatedUser?.bio,
        });

        navigate(`/profile/${user.$id}`);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col w-full max-w-5xl gap-9"
            >
                <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <FileUploader
                                    fieldChange={field.onChange}
                                    imageUrl={user?.imageUrl}
                                    type="profile"
                                />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">
                                Name
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    {...field}
                                    className="shad-input"
                                />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">
                                Username
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    {...field}
                                    className="shad-input"
                                    disabled
                                />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">
                                Email
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    {...field}
                                    className="shad-input"
                                    disabled
                                />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">
                                Bio
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    className="shad-input custom-scrollbar"
                                />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="w-fit ml-auto cursor-pointer shad-button_primary"
                    disabled={isUpdatingUser}
                >
                    {isUpdatingUser ? "Updating..." : "Update Profile"}
                </Button>
            </form>
        </Form>
    );
}

export default ProfileForm;
