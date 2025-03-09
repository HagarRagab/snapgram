import { Models } from "appwrite";

type PostCaptionProp = {
    post?: Models.Document;
    classes?: string;
};

function PostCaption({ post, classes }: PostCaptionProp) {
    return (
        <div className={`small-medium lg:base-medium py-5 ${classes}`}>
            <p>{post?.caption}</p>
            <ul className="flex gap-1 mt-2">
                {post?.tags.length > 0 &&
                    post?.tags.map((tag: string, index: number) => (
                        <li
                            key={tag + index}
                            className="text-light-3 small-regular"
                        >
                            #{tag}
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default PostCaption;
