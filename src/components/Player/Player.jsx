/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { BiShuffle, BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { RxSpeakerLoud } from "react-icons/rx";
import { RxLoop } from "react-icons/rx";
import { TbMicrophone2 } from "react-icons/tb";
import { usePlayerContext } from "../../context/PlayerProvider";
import { Link, useNavigate } from "react-router-dom";
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
    const {
        isPlaying,
        currentSong,
        setIsPlaying,
        playlist,
        setCurrentSong,
        setIsLoop,
        isLoop,
        setIsShuffle,
        isShuffle,
    } = usePlayerContext();
    const [currentTime, setCurrentTime] = useState(0);
    const progress = useRef();
    const audioRef = useRef();
    const [duration, setDuration] = useState(0);

    const navigate = useNavigate();
    const handlePlayPause = () => {
        if (isPlaying) {
            setIsPlaying(false);
            audioRef.current.pause();
        } else {
            setIsPlaying(true);
            audioRef.current.play();
        }
    };
    const handleNextSong = () => {
        const currentIndexSong = playlist.findIndex(
            (i) => i?.key == currentSong?.key
        );
        if (currentIndexSong == -1) {
            setCurrentSong(playlist[0]);
        } else {
            if (currentIndexSong < playlist.length) {
                setCurrentSong(playlist[currentIndexSong + 1]);
            } else {
                setCurrentSong(playlist[0]);
            }
        }
        setIsPlaying(true);
    };
    const handlePrevSong = () => {
        const currentIndexSong = playlist.findIndex(
            (i) => i?.key == currentSong?.key
        );
        if (currentIndexSong == -1) {
            setCurrentSong(playlist[0]);
        } else {
            if (currentIndexSong >= 1) {
                setCurrentSong(playlist[currentIndexSong - 1]);
            } else {
                setCurrentSong(playlist[0]);
            }
        }
        setIsPlaying(true);
    };
    const toggleLoop = () => setIsLoop(!isLoop);
    const toggleShuffle = () => setIsShuffle(!isShuffle);
    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying, currentSong]);

    return (
        <div className="w-full bg-black h-20 absolute bottom-0 items-center flex flex-row justify-between px-4">
            <div className="flex flex-row items-center w-72 ">
                <img
                    src={currentSong?.images?.coverart}
                    alt=""
                    className="h-16 w-16 "
                />
                <div className={"backdrop-blur bg-indigo-50 absolute"}></div>
                <div className="flex flex-col">
                    <span className="text-white ml-2 font-semibold truncate w-72">
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
                        localStorage.setItem("currentPosition", currentTime);
                    }}
                    onLoadedData={(e) => setDuration(e.currentTarget.duration)}
                />
                <div className="flex flex-row items-center justify-between mt-1 gap-4">
                    <div
                        className="w-8 h-8  rounded-full flex justify-center items-center cursor-pointer"
                        onClick={toggleShuffle}
                    >
                        <BiShuffle
                            className="text-[24px] text-gray-200"
                            style={{ color: isShuffle == true && "green" }}
                        />
                    </div>
                    <div
                        className="w-8 h-8 rounded-full flex justify-center items-center cursor-pointer"
                        onClick={handlePrevSong}
                    >
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
                    <div
                        className="w-8 h-8 justify-center items-center cursor-pointer flex"
                        onClick={handleNextSong}
                    >
                        <BiSkipNext className="text-[30px] text-gray-200" />
                    </div>
                    <div
                        className="w-8 h-8 rounded-full flex justify-center items-center cursor-pointer"
                        onClick={toggleLoop}
                    >
                        <RxLoop
                            className="text-[24px] text-gray-200"
                            style={{ color: isLoop == true && "green" }}
                        />
                    </div>
                </div>
                <div className="flex flex-row justify-between items-center w-[500px] gap-2 mt-2">
                    <span className="text-gray-200  text-[12px]">
                        {caculateTime(localStorage.getItem("currentPosition"))}
                    </span>
                    <input
                        ref={progress}
                        type="range"
                        defaultValue={
                            localStorage.getItem("currentPosition") || 0
                        }
                        className="w-full h-1"
                        step={0.1}
                        min={0}
                        max={Math.floor(audioRef.current?.duration).toString()}
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
            <div className="flex flex-row w-64  h-full items-center">
                {currentSong?.sections?.[1]?.text?.length > 0 && (
                    <TbMicrophone2
                        className="font-bold text-xl mr-4 cursor-pointer"
                        style={{
                            color:
                                location.pathname === "/lyrics"
                                    ? "green"
                                    : "white",
                        }}
                        onClick={() => {
                            if (location.pathname !== "/lyrics") {
                                navigate("/lyrics");
                            } else {
                                navigate(-1);
                            }
                        }}
                    />
                )}

                <RxSpeakerLoud className="text-white font-bold" />
                <input
                    type="range"
                    className="h-0.5 ml-2"
                    defaultValue={50}
                    max={100}
                    min={0}
                    onInput={(e) =>
                        (audioRef.current.volume = e.currentTarget.value / 100)
                    }
                />
            </div>
        </div>
    );
}

export default Player;
