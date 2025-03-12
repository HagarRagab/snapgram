import filterIcon from "/assets/icons/filter.svg";

function Filter() {
    return (
        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer ml-auto">
            <p className="small-medium md:base-medium text-light-2">All</p>
            <img src={filterIcon} alt="filter" width={20} height={20} />
        </div>
    );
}

export default Filter;
