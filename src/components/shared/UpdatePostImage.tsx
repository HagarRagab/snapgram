import { Button } from "../ui/button";
import fileUploadIcon from "/assets/icons/file-upload.svg";

type UpdatePostImageProps = {
    fileUrl: string;
};

function UpdatePostImage({ fileUrl }: UpdatePostImageProps) {
    return fileUrl ? (
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
    ) : (
        <div className="file_uploader-box">
            <img
                src={fileUploadIcon}
                alt="file upload"
                width={96}
                height={77}
            />
            <h3>Drag Photo Here</h3>
            <p className="text-light-4 small-regular mb-6">
                SVG, JPG, JPEG, PNG
            </p>
            <Button type="button" className="shad-button_dark_4 cursor-pointer">
                Select from computer
            </Button>
        </div>
    );
}

export default UpdatePostImage;
