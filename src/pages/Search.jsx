/* eslint-disable no-extra-boolean-cast */
import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import axios from "axios";
import { usePlayerContext } from "../context/PlayerProvider";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";

function Search() {
    const [searchValue, setSearchValue] = useState("");
    const [searchResult, setSearhResult] = useState(null);

    const debouceSearch = useDebounce(searchValue, 3000);

    const { setCurrentSong, isPlaying } = usePlayerContext();
    useEffect(() => {
        const search = async () => {
            const options = {
                method: "GET",
                url: "https://shazam-core.p.rapidapi.com/v1/search/multi",
                params: {
                    query: searchValue,
                    search_type: "SONGS_ARTISTS",
                },
                headers: {
                    "content-type": "application/octet-stream",
                    "X-RapidAPI-Key":
                        "52ebb81b22mshc9be28dfa4b3296p16ee67jsn63e7322d5732",
                    "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
                },
            };

            try {
                const response = await axios.request(options);
                console.log(response.data);
                setSearhResult(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        if (debouceSearch) search();
    }, [debouceSearch]);
    const genres = [
        "Podcast",
        "Live Event",
        "Made for you",
        "New Realease",
        "VietNamese Music",
        "Pop",
        "K-pop",
        "Hip Hop",
        "Chart",
        "Friend Find",
        "Equal",
        "Glow",
        "RADAR",
        "Discover",
    ];
    const randomColor = () => Math.floor(Math.random() * 16777215).toString(16);
    return (
        <div className="w-full bg-[#121212] my-2 pb-4 rounded-md overflow-y-auto mr-2">
            <div className="ml-6 mt-2">
                <input
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    type="text"
                    placeholder="What do you want to listen to?"
                    className="bg-[#282828] w-[450px] h-12 rounded-full border-none pl-4 text-white "
                />
            </div>
            {!!searchResult ? (
                <div>
                    <div className="mt-6 ml-6 grid grid-cols-2 gap-8">
                        <div>
                            <p className="text-white text-2xl font-bold mb-4 ">
                                Top Result
                            </p>
                            <div className="bg-[#404040] flex flex-col rounded-md p-6 cursor-pointer relative group">
                                <img
                                    src={
                                        searchResult?.tracks?.hits?.[0]?.track
                                            ?.images?.coverart
                                    }
                                    alt=""
                                    className="w-24 h-24 rounded-sm"
                                />
                                {/* <p>{searchResult?.tracks?.hits?.[0]?.track?.hub.actions?.[1]?.uri}</p> */}
                                <p className="text-white font-bold text-3xl mt-4">
                                    {
                                        searchResult?.tracks?.hits?.[0]?.track
                                            ?.title
                                    }
                                </p>
                                <div className="flex flex-row mt-4 gap-6 items-center">
                                    <span className="text-white/60">
                                        {
                                            searchResult?.tracks?.hits?.[0]
                                                ?.track?.subtitle
                                        }
                                    </span>
                                    <span className="text-white px-2 rounded-full bg-black/60 font-semibold">
                                        Song
                                    </span>
                                </div>
                                <div
                                    className="bg-[#1fdf64] w-12 h-12 rounded-full absolute right-6 bottom-0 justify-center flex items-center opacity-0 group-hover:opacity-100  transition-all duration-300 group-hover:bottom-4"
                                    onClick={() =>
                                        setCurrentSong(
                                            searchResult?.tracks?.hits?.[0]
                                                ?.track
                                        )
                                    }
                                >
                                    {!isPlaying ? (
                                        <BsFillPlayFill className="text-[#000] text-[24px]" />
                                    ) : (
                                        <BsFillPauseFill className="text-[#000] text-[24px]" />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="text-white text-2xl font-bold mb-4 ">
                                Songs
                            </p>
                            <div className="flex flex-col gap-2 cursor-pointer mr-4">
                                {searchResult?.tracks?.hits
                                    ?.slice(0, 4)
                                    .map((hits) => (
                                        <div
                                            key={hits.track.key}
                                            className="flex flex-row hover:bg-[#282828] py-1 pl-3 items-center rounded-md group relative"
                                        >
                                            <img
                                                src={
                                                    hits?.track?.images
                                                        ?.coverart
                                                }
                                                alt=""
                                                className="h-10 w-10  group-hover:brightness-50"
                                            />
                                            <BsFillPlayFill
                                                className="absolute text-white opacity-0 group-hover:opacity-100 left-6 cursor-pointer"
                                                onClick={() =>
                                                    setCurrentSong(hits?.track)
                                                }
                                            />
                                            <div className="ml-2">
                                                <p className="text-white">
                                                    {hits?.track?.title}
                                                </p>
                                                <p className="text-white/50">
                                                    {hits?.track?.subtitle}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        <p>Artis</p>
                        <div></div>
                    </div>
                </div>
            ) : (
                <div className="mt-6 ml-6">
                    <p className="text-white text-2xl font-bold mb-4">
                        Brower all
                    </p>
                    <div className="grid grid-cols-5 gap-6">
                        {genres.map((g, index) => (
                            <div
                                key={index}
                                className="h-52 w-52 cursor-pointer p-4 rounded-md relative overflow-hidden"
                                style={{
                                    backgroundColor: "#" + randomColor(),
                                }}
                            >
                                <img
                                    src={`https://picsum.photos/200/${
                                        300 + index
                                    }`}
                                    alt=""
                                    className="w-24 h-24 absolute bottom-0 rotate-12 -right-2  z-0"
                                />
                                <p className="text-white font-bold text-lg">
                                    {g}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Search;
