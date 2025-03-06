import PostForm from "../../components/forms/PostForm";

function CreatePost() {
    return (
        <div className="flex flex-1">
            <div className="common-container">
                <div className="max-w-5xl flex-start gap-3 w-full">
                    <img
                        src="assets/icons/add-post.svg"
                        alt="add"
                        width={36}
                        height={36}
                    />
                    <p className="h3-bold md:h2-bold w-full">Create Post</p>
                </div>

                <PostForm />
            </div>
        </div>
    );
}

export default CreatePost;
