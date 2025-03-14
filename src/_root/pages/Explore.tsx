import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { useDebounce } from "@/hooks/useDebounce";
import { useGetPosts } from "@/lib/react-query/queries";
import { Input } from "@/components/ui/input";
import SearchResults from "@/components/shared/SearchResults";
import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import TopPage from "@/components/shared/TopPage";
import searchIcon from "/assets/icons/search.svg";

function Explore() {
    const [searchTerm, setSearchTerm] = useState("");
    const { ref, inView } = useInView();

    const debouncedSearch = useDebounce(searchTerm.trim());

    const {
        data: posts,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
        isPending: isLoadingPosts,
    } = useGetPosts({ limits: 9, searchTerm: debouncedSearch });

    useEffect(() => {
        if (inView) fetchNextPage();
    }, [inView, searchTerm, fetchNextPage]);

    const isUserSearching = !!searchTerm.trim();

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
            <div className="flex-start w-full max-w-5xl mt-16 mb-7">
                {/* Heading */}
                <h3 className="body-bold md:h3-bold">Popular Today</h3>
            </div>

            {/* Popular Today Results */}
            {!posts && isLoadingPosts ? (
                <div className="flex-center w-full h-full">
                    <Loader />
                </div>
            ) : (
                <>
                    <div>
                        {isUserSearching ? (
                            <SearchResults
                                searchPosts={posts}
                                isLoadingSearchResults={isLoadingPosts}
                            />
                        ) : (
                            <GridPostList posts={posts} />
                        )}
                    </div>

                    {/* Next page */}
                    {!hasNextPage && posts?.pages[0]?.documents?.length ? (
                        <p className="text-light-4">- End of posts -</p>
                    ) : (
                        <div ref={ref}>{isFetchingNextPage && <Loader />}</div>
                    )}
                </>
            )}
        </div>
    );
}

export default Explore;
