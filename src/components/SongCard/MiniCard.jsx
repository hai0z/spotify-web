/* eslint-disable react/prop-types */
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { usePlayerContext } from "../../context/PlayerProvider";
function MiniCard({ item, onClick }) {
    const { currentSong, isPlaying } = usePlayerContext();
    return (
        <div className="flex flex-row w-full bg-[#b3b3b380] items-center rounded-md cursor-pointer justify-between group">
            <div className="flex flex-row items-center w-full">
                <img
                    src={item?.images?.coverart}
                    alt="playyyy"
                    className="object-cover h-20 w-20 rounded-tl-md rounded-bl-md"
                />
                <span className="text-[16px] text-white font-bold ml-2  line-clamp-2">
                    {item?.title}
                </span>
            </div>
            <div>
                <div
                    className={`bg-[#1fdf64] w-12 h-12 rounded-full mr-4  justify-center items-center  transition-all duration-200 opacity-0 group-hover:opacity-100 flex hover:scale-105 shadow-sm ${
                        currentSong?.key === item?.key &&
                        isPlaying &&
                        "opacity-100"
                    }`}
                    onClick={onClick}
                >
                    {isPlaying && item?.key === currentSong?.key ? (
                        <BsFillPauseFill className="text-[#000] text-[24px]" />
                    ) : (
                        <BsFillPlayFill className="text-[#000] text-[24px]" />
                    )}
                </div>
            </div>
        </div>
    );
}

export default MiniCard;
