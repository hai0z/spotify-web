import {
    AiFillHome,
    AiOutlineSearch,
    AiOutlineArrowRight,
} from "react-icons/ai";
import { BiLibrary } from "react-icons/bi";
import { IoIosAdd } from "react-icons/io";
import PlaylistCard from "../Library/PlaylistCard";
import { usePlayerContext } from "../../context/PlayerProvider";
import { Link, useLocation } from "react-router-dom";

function LeftPanel() {
    const { expandLibrary, setExpandLibrary, panelWidth, setPanelWidth } =
        usePlayerContext();
    const toggleLibrary = () => {
        const s = !expandLibrary;
        setExpandLibrary(s);
        setPanelWidth(s ? 400 : 80);
    };
    const location = useLocation();

    return (
        <div
            className={`bg-[#000000] flex flex-col items-center px-1 py-2 flex-shrink-0
                    `}
            style={{
                width: panelWidth,
            }}
        >
            <div className="bg-[#121212] h-28 w-full flex flex-col rounded-md justify-around">
                <Link
                    to={"/"}
                    className="flex flex-row items-center cursor-pointer"
                    style={{
                        justifyContent: !expandLibrary && "center",
                        marginLeft: expandLibrary ? 16 : 0,
                    }}
                >
                    <AiFillHome
                        className="text-[28px]"
                        style={{
                            color: location.pathname === "/" ? "white" : "gray",
                        }}
                    />
                    <p
                        className="text-white ml-2 font-bold"
                        style={{
                            display: expandLibrary ? "block" : "none",
                            color: location.pathname === "/" ? "white" : "gray",
                        }}
                    >
                        Home
                    </p>
                </Link>
                <Link
                    to={"/search"}
                    className="flex flex-row items-center cursor-pointer w-full"
                    style={{
                        justifyContent: !expandLibrary && "center",
                        marginLeft: expandLibrary ? 16 : 0,
                    }}
                >
                    <AiOutlineSearch
                        className="text-[28px]"
                        style={{
                            color:
                                location.pathname === "/search"
                                    ? "white"
                                    : "gray",
                        }}
                    />
                    <p
                        className="ml-2 font-bold"
                        to={"/search"}
                        style={{
                            display: expandLibrary ? "block" : "none",
                            color:
                                location.pathname === "/search"
                                    ? "white"
                                    : "gray",
                        }}
                    >
                        Search
                    </p>
                </Link>
            </div>
            <div
                className="bg-[#121212] mt-2 h-full w-full rounded-md  overflow-hidden "
                style={{
                    paddingLeft: expandLibrary && 16,
                }}
            >
                <div className="flex flex-col mt-2 ">
                    <div
                        className="flex flex-row justify-between mt-2 "
                        style={{
                            justifyContent: !expandLibrary && "center",
                        }}
                    >
                        <div
                            className="flex flex-row items-center cursor-pointer group"
                            onClick={toggleLibrary}
                        >
                            <BiLibrary className="text-white text-[28px]" />
                            <span
                                className="text-gray-200 font-bold ml-2 text-lg"
                                style={{
                                    display: expandLibrary ? "block" : "none",
                                }}
                            >
                                Your Library
                            </span>
                            <span
                                className=" absolute hidden h-6 bg-[#282828] rounded-sm group-hover:block px-1"
                                style={{
                                    top: expandLibrary && 96,
                                    left: !expandLibrary && 60,
                                }}
                            >
                                <span className="text-white ">
                                    {expandLibrary
                                        ? " Collapse your library"
                                        : "Expand your library"}
                                </span>
                            </span>
                        </div>
                        <div
                            className="flex flex-row items-center px-4"
                            style={{
                                display: expandLibrary ? "flex" : "none",
                            }}
                        >
                            <IoIosAdd className="text-white text-[28px] mr-4 " />
                            <AiOutlineArrowRight className="text-white" />
                        </div>
                    </div>
                </div>

                <div
                    className="flex flex-row mt-4"
                    style={{
                        display: expandLibrary ? "flex" : "none",
                    }}
                >
                    <button className="bg-[#2a2a2a] rounded-xl text-white px-3 mr-2">
                        Playlist
                    </button>
                    <button className="bg-[#2a2a2a] rounded-xl text-white px-3">
                        Artist
                    </button>
                </div>
                <div className="flex flex-col mt-2">
                    <div
                        className="flex flex-row justify-between"
                        style={{
                            display: expandLibrary ? "flex" : "none",
                        }}
                    >
                        <AiOutlineSearch className="text-gray-200 text-lg" />
                        <span className="text-white text-[12px] mr-2">
                            Recents
                        </span>
                    </div>
                    <Link
                        to={"/collection"}
                        className={`mt-4 hover:bg-[#282828] rounded-md  ${
                            location.pathname === "/collection" &&
                            "bg-[#282828]"
                        }`}
                    >
                        <PlaylistCard expanded={expandLibrary} />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LeftPanel;
