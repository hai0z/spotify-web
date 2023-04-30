/* eslint-disable react/prop-types */
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
function Header({ color }) {
    return (
        <div
            className="w-[78.5%] flex-row h-16 fixed z-20 flex items-center justify-between rounded-md overflow-hidden px-6"
            style={{
                backgroundColor: color,
            }}
        >
            <div className="flex flex-row items-center gap-3">
                <div className="w-8 h-8 rounded-full flex justify-center items-center bg-black/30">
                    <MdKeyboardArrowLeft className="text-[24px] text-white" />
                </div>
                <div className="w-8 h-8 rounded-full flex justify-center items-center bg-black/30">
                    <MdKeyboardArrowRight className="text-[24px] text-white" />
                </div>
            </div>
            <div>
                <img
                    src="https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-anime-hoat-hinh-dep-cho-nu.jpg"
                    alt=""
                    className="w-8 h-8 rounded-full"
                />
            </div>
        </div>
    );
}

export default Header;
