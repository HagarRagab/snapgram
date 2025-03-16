import { Models } from "appwrite";
import { useGetCurrentUser } from "@/lib/react-query/queries";
import TopPage from "@/components/shared/TopPage";
import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import saveIcon from "/assets/icons/save.svg";
import PageError from "@/components/shared/PageError";

function Saved() {
    const { data: user, isPending: isLoadingUser } = useGetCurrentUser();
    const savedPosts = user?.save?.map((item: Models.Document) => item.post);

    if (isLoadingUser) return <Loader />;
    return (
        <div className="saved-container">
            <TopPage icon={saveIcon} alt="save">
                Saved Posts
            </TopPage>

            {!savedPosts || !savedPosts.length || !savedPosts[0] ? (
                <PageError>No Saved Posts. Start saving posts.</PageError>
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
