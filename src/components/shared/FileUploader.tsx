import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

import { convertFileToUrl } from "@/utils/utils";
import ProfileImage from "./ProfileImage";
import UpdatePostImage from "./UpdatePostImage";

type FileUploaderProps = {
    fieldChange: (file: File[]) => void;
    imageUrl?: string;
    fallbackImageUrl?: string;
    type: "post" | "profile";
};

function FileUploader({
    fieldChange,
    imageUrl,
    fallbackImageUrl,
    type,
}: FileUploaderProps) {
    const [fileUrl, setFileUrl] = useState<string>(imageUrl || "");

    const onDrop = useCallback(
        (acceptedFiles: FileWithPath[]) => {
            fieldChange(acceptedFiles);
            setFileUrl(convertFileToUrl(acceptedFiles[0]));
        },
        [fieldChange]
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            "image/*": [],
        },
        maxSize: Math.pow(1024, 2) * 10, // 10MB
    });

    return (
        <div
            // It's recommended to add any attributes as arguments in getRootProps to prevent classes overriding
            {...getRootProps({
                className: `"flex cursor-pointer "
                    ${
                        type === "post"
                            ? "bg-dark-3 items-center justify-center flex-col rounded-xl"
                            : "w-fit"
                    }`,
            })}
        >
            <input {...getInputProps()} />

            {type === "profile" && fallbackImageUrl ? (
                <div className="flex items-center gap-4 cursor-pointer w-fit">
                    <ProfileImage
                        key={fileUrl}
                        profileImage={fileUrl}
                        fallbackProfileImage={fallbackImageUrl}
                        size="w-25 h-25"
                    />
                    <p className="text-cyan">Change profile picture</p>
                </div>
            ) : (
                <UpdatePostImage fileUrl={fileUrl} />
            )}
        </div>
    );
}

export default FileUploader;
