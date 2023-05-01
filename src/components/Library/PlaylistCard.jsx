import { usePlayerContext } from "../../context/PlayerProvider";

/* eslint-disable react/prop-types */
function PlaylistCard({ expanded }) {
    const { playlist } = usePlayerContext();
    return (
        <div
            className="flex flex-row mb-3 rounded-sm cursor-pointer"
            style={{
                justifyContent: !expanded && "center",
            }}
        >
            <div className="object-cover h-12 w-12 rounded-sm bg-gradient-to-br from-indigo-600 to-indigo-400 flex justify-center items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-white"
                >
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
            </div>
            <div
                className="flex flex-col"
                style={{
                    display: expanded ? "flex" : "none",
                    justifyContent: !expanded && "center",
                    marginLeft: expanded ? 8 : 0,
                }}
            >
                <span className="text-white text-[16px] font-semibold">
                    Bài hát đã thích
                </span>
                <span className="text-slate-300 text-[12px] font-semibold">
                    Playlist • {playlist?.length} songs
                </span>
            </div>
        </div>
    );
}

export default PlaylistCard;
