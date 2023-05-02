/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { usePlayerContext } from "../../context/PlayerProvider";

function Card({ item }) {
    const { setCurrentSong, isPlaying, currentSong, setIsPlaying } =
        usePlayerContext();
    return (
        <div className="w-48 h-64 bg-[#282828] flex flex-col justify-center rounded-md  cursor-pointer relative group hover:bg-[#404040] duration-300">
            <img
                src={item?.images?.coverart}
                alt=""
                className="w-36 h-36  rounded-md self-center relative"
            />
            <div className="ml-4 mt-3">
                <p className="text-white font-semibold text-[16px] truncate w-40">
                    {item?.title}
                </p>
                <p className="text-white/50 text-left font-mono font-semibold truncate mt-1 text-[14px]">
                    {item?.subtitle}
                </p>
            </div>
            <div
                className={`bg-[#1fdf64] w-12 h-12 rounded-full absolute right-8 shadow-md bottom-20 justify-center flex items-center opacity-0 group-hover:opacity-100  transition-all duration-300 group-hover:bottom-24 hover:scale-105 ${
                    currentSong?.key === item?.key &&
                    isPlaying &&
                    "opacity-100 bottom-24"
                }`}
                onClick={() => {
                    if (item?.key !== currentSong?.key) {
                        setIsPlaying(true);
                        setCurrentSong(item);
                    } else {
                        setIsPlaying(!isPlaying);
                    }
                }}
            >
                {isPlaying && item?.key === currentSong?.key ? (
                    <BsFillPauseFill className="text-[#000] text-[24px]" />
                ) : (
                    <BsFillPlayFill className="text-[#000] text-[24px]" />
                )}
            </div>
        </div>
    );
}

export default Card;
