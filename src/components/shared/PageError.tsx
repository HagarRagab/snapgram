import warningIcon from "/assets/icons/warning.svg";

type PageErrorProps = {
    children: string;
};

function PageError({ children }: PageErrorProps) {
    return (
        <div className="flex-center flex-col gap-6 w-full">
            <img
                src={warningIcon}
                alt="warning"
                width={60}
                height={60}
                className="invert-white"
            />
            <p>{children}</p>
        </div>
    );
}

export default PageError;
