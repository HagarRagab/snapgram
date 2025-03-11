type TopPageProps = {
    children: string;
    icon?: string;
    alt?: string;
};

function TopPage({ children, icon, alt }: TopPageProps) {
    return (
        <div className="flex-start gap-3 w-full max-w-5xl">
            {icon && (
                <img
                    src={icon}
                    alt={alt}
                    width={36}
                    height={36}
                    className="invert-white"
                />
            )}
            <h2 className="h3-bold md:h2-bold w-full">{children}</h2>
        </div>
    );
}

export default TopPage;
