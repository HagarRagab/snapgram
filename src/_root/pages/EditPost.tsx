import { useParams } from "react-router";

import { useGetPostById } from "@/lib/react-query/queries";
import PostForm from "@/components/forms/PostForm";
import Loader from "@/components/shared/Loader";
import editIcon from "/assets/icons/edit.svg";

function EditPost() {
    const { id } = useParams(); // might return nothing => user tries to access route updat-post/ without post id
    const { data: post, isPending } = useGetPostById(id);

    return (
        <div className="flex flex-1">
            <div className="common-container">
                <div className="max-w-5xl flex-start gap-3 w-full">
                    <img src={editIcon} alt="add" width={36} height={36} />
                    <p className="h3-bold md:h2-bold w-full">Edit Post</p>
                </div>

                {isPending ? (
                    <Loader />
                ) : (
                    <PostForm action="Edit" post={post} />
                )}
            </div>
        </div>
    );
}

export default EditPost;
