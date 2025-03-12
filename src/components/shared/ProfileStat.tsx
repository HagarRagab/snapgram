function ProfileStat({ children, count }: { children: string; count: number }) {
    return (
        <div className="flex flex-col gap-1">
            <p className="text-primary-500">{count}</p>
            <p>{children}</p>
        </div>
    );
}

export default ProfileStat;
