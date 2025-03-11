import TopPage from "@/components/shared/TopPage";
import PostForm from "../../components/forms/PostForm";

import addIcon from "/assets/icons/add-post.svg";

function CreatePost() {
    return (
        <div className="flex flex-1">
            <div className="common-container">
                <TopPage icon={addIcon} alt="add">
                    Create Post
                </TopPage>

                <PostForm action="Create" />
            </div>
        </div>
    );
}

export default CreatePost;
