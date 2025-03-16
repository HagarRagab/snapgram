import { InfiniteData } from "@tanstack/react-query";
import { Models } from "appwrite";

import Loader from "./Loader";
import GridPostList from "./GridPostList";

type SearchResultsProps = {
    searchPosts: InfiniteData<Models.DocumentList<Models.Document>> | undefined;
    isLoadingSearchResults: boolean;
};

function SearchResults({
    searchPosts,
    isLoadingSearchResults,
}: SearchResultsProps) {
    if (isLoadingSearchResults) return <Loader />;

    if (!searchPosts?.pages[0].documents.length)
        return (
            <p className="text-light-4 mt-10 text-center w-full">
                No results found
            </p>
        );

    return <GridPostList posts={searchPosts} />;
}

export default SearchResults;
