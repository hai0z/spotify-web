/* eslint-disable react/prop-types */
import { BsFillPlayFill } from "react-icons/bs";
function MiniCard({ item, onClick }) {
    return (
        <div className="flex flex-row bg-[#b3b3b380] items-center rounded-md cursor-pointer justify-between group">
            <div className="flex flex-row items-center ">
                <img
                    src={item?.images?.coverart}
                    alt="playyyy"
                    className="object-cover h-20 w-20 rounded-tl-md rounded-bl-md"
                />
                <span className="text-[16px] text-white font-bold ml-2  overflow-hidden block truncate">
                    {item?.title}
                </span>
            </div>
            <div
                className="bg-[#1fdf64] w-12 h-12 rounded-full mr-4  justify-center items-center  transition-all duration-200 opacity-0 group-hover:opacity-100 flex "
                onClick={onClick}
            >
                <BsFillPlayFill className="text-[#000] text-[24px]" />
            </div>
        </div>
    );
}

export default MiniCard;
