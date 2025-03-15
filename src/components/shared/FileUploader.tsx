import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

import UpdatePostImage from "./UpdatePostImage";
import UpdateProfileImage from "./UpdateProfileImage";
import { convertFileToUrl } from "@/utils/utils";

type FileUploaderProps = {
    fieldChange: (file: File[]) => void;
    imageUrl: string;
    type: "post" | "profile";
};

function FileUploader({ fieldChange, imageUrl, type }: FileUploaderProps) {
    const [fileUrl, setFileUrl] = useState<string>(imageUrl);

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

            {type === "post" ? (
                <UpdatePostImage fileUrl={fileUrl} />
            ) : (
                <UpdateProfileImage fileUrl={fileUrl} />
            )}
        </div>
    );
}

export default FileUploader;
