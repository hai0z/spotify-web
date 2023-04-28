/* eslint-disable react/prop-types */
function PlaylistCard({ item }) {
    return (
        <div className="flex flex-row mb-2">
            <img
                src={item?.images?.coverart}
                alt="playlist"
                className="object-cover h-12 w-12"
            />
            <div className="flex flex-col ml-2">
                <span className="text-white">{item.title}</span>
                <span className="text-slate-300 text-[11px] font-bold">
                    My playlist * 29 songs
                </span>
            </div>
        </div>
    );
}

export default PlaylistCard;
