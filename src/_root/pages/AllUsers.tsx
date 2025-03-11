import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { useGetUsers } from "@/lib/react-query/queries";
import Loader from "@/components/shared/Loader";
import peopleIcon from "/assets/icons/people.svg";
import TopPage from "@/components/shared/TopPage";
import GridUserList from "@/components/shared/GridUserList";

function AllUsers() {
    const {
        data: users,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        isPending: isLoadingUsers,
    } = useGetUsers();
    const { ref, inView } = useInView();

    console.log(hasNextPage);

    useEffect(() => {
        if (inView) fetchNextPage();
    }, [fetchNextPage, inView]);

    return (
        <div className="common-container">
            <TopPage icon={peopleIcon} alt="people">
                All Users
            </TopPage>

            <div>
                {isLoadingUsers ? (
                    <Loader />
                ) : (
                    <div>
                        <GridUserList users={users} />

                        {hasNextPage ? (
                            <div ref={ref}>
                                {isFetchingNextPage && <Loader />}
                            </div>
                        ) : (
                            <p className="text-light-4 text-center">
                                - End of users -
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AllUsers;
