import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "../ui/button";

type FileUploaderProps = {
    fieldChange: (file: File[]) => void;
    imageUrl: string;
};

function FileUploader({ fieldChange, imageUrl = "" }: FileUploaderProps) {
    // const [file, setFile] = useState<File[]>([]);
    const [fileUrl, setFileUrl] = useState<string>(imageUrl);

    const onDrop = useCallback(
        (acceptedFiles: FileWithPath[]) => {
            // setFile(acceptedFiles);
            fieldChange(acceptedFiles);
            setFileUrl(URL.createObjectURL(acceptedFiles[0]));
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
            // It's recommended to add any attributes as arguments in getRootProps to prevent overriding => ex: getRootProps({className: "flex ..."})
            {...getRootProps()}
            className="flex-center flex-col cursor-pointer bg-dark-3 rounded-xl"
        >
            <input {...getInputProps()} />

            {fileUrl && (
                <>
                    <div className="flex-center flex-1 p-5 w-full lg:p-10">
                        <img
                            src={fileUrl}
                            alt="post image"
                            className="file_uploader-image"
                        />
                    </div>
                    <p className="file_uploader-label">
                        Click or drag photo to replace
                    </p>
                </>
            )}

            {!fileUrl && (
                <div className="file_uploader-box">
                    <img
                        src="assets/icons/file-upload.svg"
                        alt="file upload"
                        width={96}
                        height={77}
                    />
                    <h3>Drag Photo Here</h3>
                    <p className="text-light-4 small-regular mb-6">
                        SVG, JPG, JPEG, PNG
                    </p>
                    <Button
                        type="button"
                        className="shad-button_dark_4 cursor-pointer"
                    >
                        Select from computer
                    </Button>
                </div>
            )}
        </div>
    );
}

export default FileUploader;
