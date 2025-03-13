type UpdateProfileImageProps = {
    fileUrl: string;
};

function UpdateProfileImage({ fileUrl }: UpdateProfileImageProps) {
    return (
        <div className="flex items-center gap-4 cursor-pointer w-fit">
            <img
                src={fileUrl}
                alt={`${fileUrl}'s profile image`}
                width={100}
                height={100}
                className="rounded-full"
            />
            <p className="text-cyan">Change profile picture</p>
        </div>
    );
}

export default UpdateProfileImage;
