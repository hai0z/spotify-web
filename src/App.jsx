import MiniCard from "./components/SongCard/MiniCard";
import { useState, useRef } from "react";
import { usePlayerContext } from "./context/PlayerProvider";
import Card from "./components/SongCard/Card";
import Header from "./components/header/Header";
function App() {
    const [currentColor, setCurrentColor] = useState("#1c0f3f");
    const { setCurrentSong, playlist, setIsPlaying, isPlaying } =
        usePlayerContext();
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
                    {playlist.slice(20, 26)?.map((item, index) => (
                        <div
                            key={index}
                            onMouseEnter={() => {
                                setCurrentColor(
                                    `#${
                                        item?.images?.joecolor?.split(":")[5]
                                    }80`
                                );
                            }}
                        >
                            <MiniCard
                                item={item}
                                onClick={() => {
                                    setCurrentSong(item);
                                    setIsPlaying(!isPlaying);
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
                    <div className="grid grid-cols-4 xl:grid-cols-5">
                        {playlist.slice(4, 9).map((song, index) => (
                            <Card key={index} item={song} />
                        ))}
                    </div>
                </div>
                <div className="mt-4">
                    <p className="text-white text-[28px] font-bold mb-4">
                        For you
                    </p>
                    <div className="grid grid-cols-4 md:grid-cols-5">
                        {playlist.slice(30, 35).map((song, index) => (
                            <Card key={index} item={song} />
                        ))}
                    </div>
                </div>
                <div className="mt-4">
                    <p className="text-white text-[28px] font-bold mb-4">
                        Top mixes
                    </p>
                    <div className="grid grid-cols-4 md:grid-cols-5">
                        {playlist.slice(40, 45).map((song, index) => (
                            <Card key={index} item={song} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
