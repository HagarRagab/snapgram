import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { useDebounce } from "@/hooks/useDebounce";
import { useGetPosts, useSearchPosts } from "@/lib/react-query/queries";
import { Input } from "@/components/ui/input";
import SearchResults from "@/components/shared/SearchResults";
import GridPostList from "@/components/shared/GridPostList";
import searchIcon from "/assets/icons/search.svg";
import filterIcon from "/assets/icons/filter.svg";
import Loader from "@/components/shared/Loader";
import TopPage from "@/components/shared/TopPage";

function Explore() {
    const [searchTerm, setSearchTerm] = useState("");
    const { ref, inView } = useInView();

    const debouncedSearch = useDebounce(searchTerm);

    const { data: searchPosts, isPending: isLoadingSearchResults } =
        useSearchPosts(debouncedSearch);

    const {
        data: posts,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
        isPending: isLoadingPosts,
    } = useGetPosts();

    useEffect(() => {
        if (inView && !searchTerm.trim()) fetchNextPage();
    }, [inView, searchTerm, fetchNextPage]);

    const shouldShowSearchResults = !!searchTerm.trim();
    const shouldShowPosts =
        !shouldShowSearchResults &&
        posts?.pages.every((page) => page?.documents.length > 0); //!

    return (
        <div className="explore-container">
            {/* Heading + Search Bar */}
            <div className="explore-inner_container">
                <TopPage>Search Posts</TopPage>
                <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
                    <img src={searchIcon} alt="search" width={24} height={24} />
                    <Input
                        type="text"
                        placeholder="Search..."
                        className="explore-search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Popular Today Header*/}
            <div className="flex-between w-full max-w-5xl mt-16 mb-7">
                {/* Heading */}
                <h3 className="body-bold md:h3-bold">Popular Today</h3>
                {/* Filter */}
                <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
                    <p className="small-medium md:base-medium text-light-2">
                        All
                    </p>
                    <img src={filterIcon} alt="filter" width={20} height={20} />
                </div>
            </div>

            {/* Popular Today Results */}
            {!posts && isLoadingPosts ? (
                <div className="flex-center w-full h-full">
                    <Loader />
                </div>
            ) : (
                <>
                    <div>
                        {shouldShowSearchResults ? (
                            <SearchResults
                                searchPosts={searchPosts?.documents}
                                isLoadingSearchResults={isLoadingSearchResults}
                            />
                        ) : (
                            <GridPostList posts={posts} />
                        )}
                    </div>

                    {/* Next page */}
                    {hasNextPage && !shouldShowSearchResults && (
                        <div className="mt-10" ref={ref}>
                            {isFetchingNextPage && <Loader />}
                        </div>
                    )}

                    {!shouldShowPosts && !shouldShowSearchResults && (
                        <p className="text-light-4">- End of posts -</p>
                    )}
                </>
            )}
        </div>
    );
}

export default Explore;
