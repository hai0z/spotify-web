/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable no-extra-boolean-cast */
import React, { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import axios from "axios";
import { usePlayerContext } from "../context/PlayerProvider";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { db } from "../firebase";
const SearchCard = React.memo(({ index, g }) => {
    const randomColor = () => Math.floor(Math.random() * 16777215).toString(16);

    return (
        <div
            key={index}
            className="h-48 w-48 cursor-pointer p-4 rounded-md relative overflow-hidden"
            style={{
                backgroundColor: "#" + randomColor(),
            }}
        >
            <img
                src={`https://picsum.photos/200/${300 + index}`}
                alt=""
                className="w-24 h-24 absolute bottom-0 rotate-12 -right-2  z-0"
            />
            <p className="text-white font-bold text-lg">{g}</p>
        </div>
    );
});

function Search() {
    const [searchValue, setSearchValue] = useState("");
    const [searchResult, setSearhResult] = useState(null);

    const debouceSearch = useDebounce(searchValue, 3000);

    const { setCurrentSong, isPlaying, setIsPlaying, currentSong } =
        usePlayerContext();
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
                        "25afd00c31msh690f22c6a3516c0p1799adjsn0eade0e56e0b",
                    "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
                },
            };

            try {
                const response = await axios.request(options);
                console.log(response.data);
                setSearhResult(response.data);
                const docRef = db.doc(
                    db.getFirestore(),
                    "likedList",
                    response.data?.tracks?.hits?.[0]?.track?.key
                );
                await db.setDoc(
                    docRef,
                    response.data?.tracks?.hits?.[0]?.track
                );
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
    const togglePlay1 = () => {
        if (searchResult?.tracks?.hits?.[0]?.track?.key !== currentSong?.key) {
            setIsPlaying(true);
            setCurrentSong(searchResult?.tracks?.hits?.[0]?.track);
        } else {
            setIsPlaying(!isPlaying);
        }
    };
    const togglePlay2 = (obj) => {
        if (obj.track.key !== currentSong?.key) {
            setIsPlaying(true);
            setCurrentSong(obj.track);
        } else {
            setIsPlaying(!isPlaying);
        }
    };
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
            {!!searchResult || debouceSearch !== "" ? (
                <div>
                    <div className="mt-6 ml-6 grid grid-cols-2 gap-8">
                        <div>
                            <p className="text-white text-2xl font-bold mb-4 ">
                                Top Result
                            </p>
                            <div className="bg-[#161616] flex flex-col rounded-md p-6 cursor-pointer relative group hover:bg-[#282828]">
                                <img
                                    src={
                                        searchResult?.tracks?.hits?.[0]?.track
                                            ?.images?.coverart
                                    }
                                    alt=""
                                    className="w-24 h-24 rounded-sm"
                                />

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
                                    <span className="text-white flex justify-center items-center px-3 py-1 rounded-full bg-black/60 font-semibold">
                                        Song
                                    </span>
                                </div>
                                <div
                                    className={`bg-[#1fdf64] w-12 h-12 rounded-full absolute right-6 bottom-0 justify-center flex items-center opacity-0 group-hover:opacity-100  transition-all duration-300 group-hover:bottom-4
                                    ${
                                        currentSong?.key ===
                                            searchResult?.tracks?.hits?.[0]
                                                ?.track?.key &&
                                        isPlaying &&
                                        "opacity-100 bottom-4"
                                    }
                                    `}
                                    onClick={() => togglePlay1(searchResult)}
                                >
                                    {isPlaying &&
                                    searchResult?.tracks?.hits?.[0]?.track
                                        ?.key === currentSong?.key ? (
                                        <BsFillPauseFill className="text-[#000] text-[24px]" />
                                    ) : (
                                        <BsFillPlayFill className="text-[#000] text-[24px]" />
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
                                            className="flex flex-row hover:bg-[#282828] py-1 
                                            pl-3 items-center rounded-md group relative"
                                        >
                                            <img
                                                src={
                                                    hits?.track?.images
                                                        ?.coverart
                                                }
                                                alt=""
                                                className={`h-10 w-10  group-hover:brightness-50 ${
                                                    currentSong?.key ===
                                                        hits.track.key &&
                                                    "brightness-50"
                                                }`}
                                            />
                                            <div className="absolute left-6">
                                                {currentSong?.key ==
                                                    hits.track.key &&
                                                isPlaying ? (
                                                    <BsFillPauseFill
                                                        className={` text-white opacity-0 group-hover:opacity-100  cursor-pointer ${
                                                            currentSong?.key ===
                                                                hits.track
                                                                    .key &&
                                                            "opacity-100"
                                                        }`}
                                                        onClick={() =>
                                                            togglePlay2(hits)
                                                        }
                                                    />
                                                ) : (
                                                    <BsFillPlayFill
                                                        className={` text-white opacity-0 group-hover:opacity-100  cursor-pointer ${
                                                            currentSong?.key ===
                                                                hits.track
                                                                    .key &&
                                                            "opacity-100"
                                                        }`}
                                                        onClick={() =>
                                                            togglePlay2(hits)
                                                        }
                                                    />
                                                )}
                                            </div>

                                            <div className="ml-2">
                                                <p
                                                    className={`text-white ${
                                                        hits?.track?.key ===
                                                            currentSong?.key &&
                                                        "text-green-600"
                                                    }`}
                                                >
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
                    <p className="text-2xl text-white pl-6 pb-4 mt-4 font-bold">
                        Artists
                    </p>
                    <div className="grid grid-cols-5 gap-4 px-6 cursor-pointer">
                        {searchResult?.artists?.hits
                            ?.slice(0, 5)
                            .map((a, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex flex-col w-52 h-72 bg-[#161616] hover:bg-[#282828] rounded-md 
                                        justify-center items-center"
                                    >
                                        <img
                                            src={a?.artist?.avatar}
                                            alt=""
                                            className="w-44 h-44 rounded-full"
                                        />
                                        <div className="text-white self-start pl-4 space-y-2">
                                            <p className="text-white">
                                                {a.artist.name}
                                            </p>
                                            <span className="text-white">
                                                Artist
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            ) : (
                <div className="mt-6 ml-6">
                    <p className="text-white text-2xl font-bold mb-4">
                        Brower all
                    </p>
                    <div className="grid grid-cols-5 gap-8">
                        {genres.map((g, index) => (
                            <SearchCard g={g} index={index} key={index} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Search;
