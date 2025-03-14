type ProfileStatProps = {
    children: string;
    count: string;
};

function ProfileStat({ children, count }: ProfileStatProps) {
    return (
        <div className="flex flex-col gap-1">
            <p className="text-primary-500">{count}</p>
            <p>{children}</p>
        </div>
    );
}

export default ProfileStat;
