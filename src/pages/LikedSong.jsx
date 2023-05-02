import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";

import Header from "../components/header/Header";
import { usePlayerContext } from "../context/PlayerProvider";
function LikedSong() {
    const { isPlaying, setCurrentSong, setIsPlaying, playlist, currentSong } =
        usePlayerContext();
    return (
        <div className="w-full bg-[#121212] my-2 pb-4 rounded-md overflow-y-auto mr-2">
            <div>
                <Header color={""} />
                <div
                    className={`w-full h-[350px] px-6 transition-colors duration-200 rounded-t-md pt-16 flex flex-row bg-gradient-to-br 
                    from-indigo-900 to-indigo-600`}
                >
                    <div className="object-cover mt-4  h-[240px] w-[240px] rounded-sm bg-gradient-to-br from-indigo-600 to-indigo-400 flex justify-center items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-24 h-24 text-white"
                        >
                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                        </svg>
                    </div>
                    <div className="self-center ml-8">
                        <span className="text-white text-[16px] font-bold">
                            Playlist
                        </span>
                        <p className="text-white font-bold text-[80px] font-sans">
                            Liked Songs
                        </p>
                    </div>
                </div>
            </div>
            <div className="pl-4 pt-4 bg-gradient-to-b from-indigo-800 to-transparent h-64 ">
                <div
                    className={`bg-[#1fdf64] w-[55px] h-[55px]  cursor-pointer rounded-full  shadow-md justify-center flex
                     items-center ml-2
                     transition-all duration-300 hover:scale-105
                }`}
                    onClick={() => {
                        setIsPlaying(true);
                        setCurrentSong(playlist?.[0]);
                        setIsPlaying(!isPlaying);
                    }}
                >
                    {isPlaying ? (
                        <BsFillPauseFill className="text-[#000] text-[28px]" />
                    ) : (
                        <BsFillPlayFill className="text-[#000] text-[28px]" />
                    )}
                </div>
                <div className="grid grid-cols-3 mt-4 pl-4 border-b-[0.2px] border-b-white/40 pb-2 mx-4">
                    <p className="text-white/50 font-semibold -ml-4">
                        <span className="mr-8">#</span>
                        <span>Title</span>
                    </p>
                    <p className="text-white/50 font-semibold">Album</p>
                    <p className="text-white/50 font-semibold">Date added</p>
                </div>
                <div>
                    {playlist?.map((pl, index) => {
                        return (
                            <div
                                key={pl.key}
                                className="grid grid-cols-3 mt-4 pl-4 border-b-[0.2px]mx-4 hover:bg-[#60606080] p-3 rounded-md group cursor-pointer items-center gap-6"
                            >
                                <div className="flex flex-row items-center">
                                    <span className="mr-4 text-white/50 font-bold group-hover:hidden w-12">
                                        {index + 1}
                                    </span>
                                    <span
                                        className="hidden group-hover:block mr-3 w-12"
                                        onClick={() => {
                                            if (pl.key !== currentSong?.key) {
                                                setIsPlaying(true);
                                                setCurrentSong(pl);
                                            } else {
                                                setIsPlaying(!isPlaying);
                                            }
                                        }}
                                    >
                                        {currentSong?.key == pl.key &&
                                        isPlaying ? (
                                            <BsFillPauseFill className="text-[#fff] text-[18px]" />
                                        ) : (
                                            <BsFillPlayFill className="text-[#fff] text-[18px]" />
                                        )}
                                    </span>
                                    <img
                                        src={pl?.images?.coverart}
                                        alt=""
                                        className="w-12 h-12"
                                    />
                                    <div className="flex flex-col ml-2 justify-center ">
                                        <span
                                            className="truncate w-64 text-white font-semibold"
                                            style={{
                                                color:
                                                    pl?.key ===
                                                        currentSong?.key &&
                                                    "#1fd664",
                                            }}
                                        >
                                            {pl.title}
                                        </span>
                                        <span className="truncate  text-white/60 text-[14px] group-hover:text-white">
                                            {pl.subtitle}
                                        </span>
                                    </div>
                                </div>
                                <h1 className="font-semibold text-white/60 truncate w-56 text-[14px] group-hover:text-white">
                                    {pl.title}
                                </h1>
                                <h1 className="font-semibold text-white/60 text-[14px] group-hover:text-white">
                                    {Math.floor(Math.random() * 4 + 1)} Weeks
                                    ago
                                </h1>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default LikedSong;
