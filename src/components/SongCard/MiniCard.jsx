/* eslint-disable react/prop-types */
import { BsFillPlayFill } from "react-icons/bs";
function MiniCard({ item }) {
    return (
        <div className="flex flex-row bg-[#b3b3b380] items-center rounded-md cursor-pointer justify-between group">
            <div className="flex flex-row items-center ">
                <img
                    src={item?.images?.coverart}
                    alt="playyyy"
                    className="object-cover h-16 w-16"
                />
                <span className="text-[16px] text-white font-bold ml-2">
                    {item?.title}
                </span>
            </div>
            <div className="bg-[#1fdf64] w-12 h-12 rounded-full mr-4  justify-center items-center hidden group-hover:flex ">
                <BsFillPlayFill className="text-[#000] text-[24px]" />
            </div>
        </div>
    );
}

export default MiniCard;
