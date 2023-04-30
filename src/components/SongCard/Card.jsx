/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { usePlayerContext } from "../../context/PlayerProvider";

function Card({ item }) {
    const { setCurrentSong, isPlaying, currentSong } = usePlayerContext();
    return (
        <div className="w-60 md:w-52 h-72 xl:w-52 bg-[#282828] flex flex-col justify-center rounded-md mx-2 cursor-pointer relative group hover:bg-[#404040] duration-300">
            <img
                src={item?.images?.coverart}
                alt=""
                className="w-44 h-44  rounded-md self-center relative"
            />
            <div className="ml-4 mt-3">
                <p className="text-white font-semibold text-[16px] truncate">
                    {item?.title}
                </p>
                <p className="text-white/50 text-left font-mono truncate mt-1">
                    {item?.subtitle}
                </p>
            </div>
            <div
                className="bg-[#1fdf64] w-12 h-12 rounded-full absolute right-6 bottom-20 justify-center flex items-center opacity-0 group-hover:opacity-100  transition-all duration-300 group-hover:bottom-24"
                onClick={() => setCurrentSong(item)}
            >
                {!isPlaying ? (
                    <BsFillPlayFill className="text-[#000] text-[24px]" />
                ) : (
                    <BsFillPauseFill className="text-[#000] text-[24px]" />
                )}
            </div>
        </div>
    );
}

export default Card;
