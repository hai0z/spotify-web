import MiniCard from "./components/SongCard/MiniCard";
import { useState, useRef } from "react";
import { usePlayerContext } from "./context/PlayerProvider";
import Card from "./components/SongCard/Card";
import Header from "./components/header/Header";
function App() {
    const [currentColor, setCurrentColor] = useState("#1c0f3f");
    const {
        setCurrentSong,
        playlist,
        setIsPlaying,
        isPlaying,
        expandLibrary,
        currentSong,
    } = usePlayerContext();
    const bodyRef = useRef();
    const [headerColor, setHeaderColor] = useState("transparent");
    return (
        <div
            className="w-full bg-[#121212] my-2 pb-4 rounded-md overflow-y-auto mr-2"
            onScroll={() => {
                if (bodyRef.current.scrollTop > 130) {
                    setHeaderColor("#1c0f3f");
                } else if (bodyRef.current.scrollTop > 90) {
                    setHeaderColor("#1c0f3f80");
                } else {
                    setHeaderColor("transparent");
                }
            }}
            ref={bodyRef}
        >
            <div className="pr-6">
                <Header color={headerColor} />
            </div>
            <div
                onMouseLeave={() => setCurrentColor("#1c0f3f")}
                className={`w-full h-64 px-6 transition-colors duration-200 rounded-md pt-16`}
                style={{
                    background: `linear-gradient(to bottom,  ${currentColor} 0%,transparent 100%)`,
                }}
            >
                <h1 className="font-bold text-[30px] text-white pt-2">
                    Good evening
                </h1>
                <div className="w-full grid grid-cols-3 gap-4 mt-2">
                    {playlist.slice(6, 12)?.map((item, index) => (
                        <div
                            key={index}
                            onMouseEnter={() => {
                                setCurrentColor(
                                    `#${
                                        item?.images?.joecolor?.split(":")[5]
                                    }90`
                                );
                            }}
                        >
                            <MiniCard
                                item={item}
                                onClick={() => {
                                    if (item?.key !== currentSong?.key) {
                                        setIsPlaying(true);
                                        setCurrentSong(item);
                                    } else {
                                        setIsPlaying(!isPlaying);
                                    }
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="ml-6">
                <div className="mt-20">
                    <p className="text-white text-[28px] font-bold mb-4">
                        Trending
                    </p>
                    <div className={`flex gap-8 overflow-hidden`}>
                        {playlist
                            .slice(60, expandLibrary ? 67 : 68)
                            .map((song, index) => (
                                <Card key={index} item={song} />
                            ))}
                    </div>
                </div>
                <div className="mt-4 w-full">
                    <p className="text-white text-[28px] font-bold mb-4">
                        For you
                    </p>
                    <div className={`flex gap-8 overflow-hidden`}>
                        {playlist
                            .slice(30, expandLibrary ? 37 : 38)
                            .map((song, index) => (
                                <Card key={index} item={song} />
                            ))}
                    </div>
                </div>
                <div className="mt-4">
                    <p className="text-white text-[28px] font-bold mb-4">
                        Top mixes
                    </p>
                    <div className={`flex gap-8 overflow-hidden`}>
                        {playlist
                            .slice(40, expandLibrary ? 47 : 48)
                            .map((song, index) => (
                                <Card key={index} item={song} />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
