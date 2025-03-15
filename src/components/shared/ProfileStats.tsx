import { formatNumbers } from "@/utils/utils";
import ProfileStat from "./ProfileStat";

type ProfileStatsProps = {
    postsCount: number;
    followersCount: number;
    followingsCount: number;
};

function ProfileStats({
    postsCount,
    followersCount,
    followingsCount,
}: ProfileStatsProps) {
    return (
        <div className="flex gap-8">
            <ProfileStat count={formatNumbers(postsCount)}>Posts</ProfileStat>
            <ProfileStat count={formatNumbers(followersCount)}>
                Followers
            </ProfileStat>
            <ProfileStat count={formatNumbers(followingsCount)}>
                Following
            </ProfileStat>
        </div>
    );
}

export default ProfileStats;
