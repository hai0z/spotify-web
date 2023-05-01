/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { BiShuffle, BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { RxLoop } from "react-icons/rx";
import { usePlayerContext } from "../../context/PlayerProvider";
/* eslint-disable react/prop-types */
const caculateTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const timeString = `${minutes
        .toString()
        .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    return timeString;
};
function Player() {
    const { isPlaying, currentSong, setIsPlaying } = usePlayerContext();
    const [currentTime, setCurrentTime] = useState(0);
    const progress = useRef();
    const audioRef = useRef();
    const [duration, setDuration] = useState(0);

    const handlePlayPause = () => {
        if (isPlaying) {
            setIsPlaying(false);
            audioRef.current.pause();
        } else {
            setIsPlaying(true);
            audioRef.current.play();
        }
    };
    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    return (
        <div className="w-full bg-black h-20 absolute bottom-0 items-center flex flex-row justify-between px-4">
            <div className="flex flex-row items-center w-72 ">
                <img
                    src={currentSong?.images?.coverart}
                    alt=""
                    className="h-16 w-16 "
                />
                <div className="flex flex-col">
                    <span className="text-white ml-2 font-semibold truncate">
                        {currentSong?.title}
                    </span>
                    <span className="text-[12px] text-[#ffffff80] ml-2 truncate">
                        {currentSong?.subtitle}
                    </span>
                </div>
            </div>

            <div className="flex flex-col items-center h-full ">
                <audio
                    loop
                    ref={audioRef}
                    src={currentSong?.hub?.actions?.[1]?.uri}
                    onTimeUpdate={(e) => {
                        setCurrentTime(e.currentTarget.currentTime);
                        progress.current.value = currentTime;
                    }}
                    onLoadedData={(e) => setDuration(e.currentTarget.duration)}
                />
                <div className="flex flex-row items-center justify-between mt-1 gap-4">
                    <div className="w-8 h-8  rounded-full flex justify-center items-center cursor-pointer">
                        <BiShuffle className="text-[24px] text-gray-200" />
                    </div>
                    <div className="w-8 h-8 rounded-full flex justify-center items-center cursor-pointer">
                        <BiSkipPrevious className="text-[30px] text-gray-200" />
                    </div>
                    <div
                        className="w-8 h-8 bg-white rounded-full flex justify-center items-center cursor-pointer"
                        onClick={handlePlayPause}
                    >
                        {!isPlaying ? (
                            <BsFillPlayFill
                                className="text-[24px] text-black"
                                onClick={handlePlayPause}
                            />
                        ) : (
                            <BsFillPauseFill
                                className="text-[24px] text-black"
                                onClick={handlePlayPause}
                            />
                        )}
                    </div>
                    <div className="w-8 h-8 justify-center items-center cursor-pointer flex">
                        <BiSkipNext className="text-[30px] text-gray-200" />
                    </div>
                    <div className="w-8 h-8 rounded-full flex justify-center items-center cursor-pointer">
                        <RxLoop className="text-[24px] text-gray-200" />
                    </div>
                </div>
                <div className="flex flex-row justify-between items-center w-[500px] gap-2 mt-2">
                    <span className="text-gray-200  text-[12px]">
                        {caculateTime(currentTime)}
                    </span>
                    <input
                        ref={progress}
                        type="range"
                        className="w-full h-1 bg-red-500"
                        step={0.25}
                        min={0}
                        max={Math.floor(audioRef.current?.duration)}
                        onInput={(e) =>
                            (audioRef.current.currentTime =
                                e.currentTarget.value)
                        }
                    />
                    <span className="text-gray-200 text-[12px]">
                        {caculateTime(duration)}
                    </span>
                </div>
            </div>
            <div className="flex flex-row w-64  h-full"></div>
        </div>
    );
}

export default Player;
