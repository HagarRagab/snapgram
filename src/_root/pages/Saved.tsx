import { Models } from "appwrite";
import { useGetCurrentUser } from "@/lib/react-query/queries";
import TopPage from "@/components/shared/TopPage";
import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import saveIcon from "/assets/icons/save.svg";

function Saved() {
    const { data: user, isPending: isLoadingUser } = useGetCurrentUser();
    const savedPosts = user?.save.map((item: Models.Document) => item.post);

    return (
        <div className="saved-container">
            <TopPage icon={saveIcon} alt="save">
                Saved Posts
            </TopPage>

            {isLoadingUser ? (
                <Loader />
            ) : (
                <GridPostList
                    posts={savedPosts}
                    showUser={false}
                    showStats={false}
                />
            )}
        </div>
    );
}

export default Saved;
