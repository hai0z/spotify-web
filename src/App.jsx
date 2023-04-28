import {
    AiFillHome,
    AiOutlineSearch,
    AiOutlineArrowRight,
} from "react-icons/ai";
import { BiLibrary } from "react-icons/bi";
import { IoIosAdd } from "react-icons/io";
import PlaylistCard from "./components/Library/PlaylistCard";
import MiniCard from "./components/SongCard/MiniCard";
import axios from "axios";
import { useEffect, useState } from "react";
import Player from "./components/Player/Player";
function App() {
    const [playlist, setPlaylist] = useState([]);
    const [playSong, setPlaySong] = useState("");
    const [currentColor, setCurrentColor] = useState("#1c0f3f");
    useEffect(() => {
        const getPlaylist = async () => {
            const options = {
                method: "GET",
                url: "https://shazam-core.p.rapidapi.com/v1/charts/country",
                params: { country_code: "VN" },
                headers: {
                    "content-type": "application/octet-stream",
                    "X-RapidAPI-Key":
                        "fcfe5a00eemshcaa5ba933a8931dp18407cjsn06329a84995b",
                    "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
                },
            };

            try {
                const response = await axios.request(options);
                setPlaylist(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        getPlaylist();
    }, []);
    return (
        <div className="h-screen">
            <div className="w-full bg-[#000000] flex flex-row gap-2">
                <div className="bg-[#000000]  w-2/12 flex flex-col items-center px-1 py-1">
                    <div className="bg-[#121212] h-28 w-full flex flex-col rounded-md justify-around pl-2">
                        <div className="flex flex-row items-center cursor-pointer">
                            <AiFillHome className="text-white text-lg" />
                            <span className="text-white ml-2">Home</span>
                        </div>
                        <div className="flex flex-row items-center cursor-pointer">
                            <AiOutlineSearch className="text-gray-200 text-lg" />
                            <span className="text-gray-200 ml-2">Search</span>
                        </div>
                    </div>
                    <div className="bg-[#121212] mt-4 h-full w-full rounded-md pl-2 overflow-hidden">
                        <div className="flex flex-col">
                            <div className="flex flex-row justify-between">
                                <div className="flex flex-row items-center ">
                                    <BiLibrary className="text-white text-lg" />
                                    <span className="text-white ml-2">
                                        Your Library
                                    </span>
                                </div>
                                <div className="flex flex-row items-center px-2">
                                    <IoIosAdd className="text-white text-lg mr-4 " />
                                    <AiOutlineArrowRight className="text-white" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row mt-4">
                            <button className="bg-[#2a2a2a] rounded-xl text-white px-3 mr-2">
                                Playlist
                            </button>
                            <button className="bg-[#2a2a2a] rounded-xl text-white px-3">
                                Artist
                            </button>
                        </div>
                        <div className="flex flex-col ml-2 mt-2">
                            <div className="flex flex-row justify-between">
                                <AiOutlineSearch className="text-gray-200 text-lg" />
                                <span className="text-white text-[12px] mr-2">
                                    Recents
                                </span>
                            </div>
                            <div className="mt-4">
                                {playlist.slice(30, 35).map((item, index) => (
                                    <PlaylistCard key={index} item={item} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-10/12 min-h-screen bg-[#121212] ">
                    <div
                        className={`w-full h-64 px-4 transition-all duration-200`}
                        style={{
                            background: `linear-gradient(to bottom,  ${currentColor} 0%,#121212 100%)`,
                        }}
                    >
                        <h1 className="font-bold text-[30px] text-white">
                            Good evening
                        </h1>
                        <div className="w-full grid grid-cols-3 gap-4 mt-2">
                            {playlist.slice(10, 16)?.map((item, index) => (
                                <div
                                    onClick={() => setPlaySong(item)}
                                    key={index}
                                    onMouseEnter={() => {
                                        setCurrentColor(
                                            `#${
                                                item?.images?.joecolor?.split(
                                                    ":"
                                                )[5]
                                            }`
                                        );
                                    }}
                                >
                                    <MiniCard item={item} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Player item={playSong} />
        </div>
    );
}

export default App;
