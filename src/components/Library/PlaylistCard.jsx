/* eslint-disable react/prop-types */
function PlaylistCard({ item, expanded }) {
    return (
        <div
            className="flex flex-row mb-3 rounded-sm"
            style={{
                justifyContent: !expanded && "center",
            }}
        >
            <img
                src={item?.images?.coverart}
                alt="playlist"
                className="object-cover h-12 w-12 rounded-sm"
            />
            <div
                className="flex flex-col"
                style={{
                    display: expanded ? "flex" : "none",
                    justifyContent: !expanded && "center",
                    marginLeft: expanded ? 8 : 0,
                }}
            >
                <span className="text-white text-[16px] font-semibold">
                    {item.title}
                </span>
                <span className="text-slate-300 text-[12px] font-semibold">
                    My playlist * 29 songs
                </span>
            </div>
        </div>
    );
}

export default PlaylistCard;
