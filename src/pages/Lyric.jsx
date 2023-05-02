import Header from "../components/header/Header";
import { usePlayerContext } from "../context/PlayerProvider";

function Lyric() {
    const { currentSong } = usePlayerContext();
    return (
        <div className="w-full bg-[#121212] my-2 rounded-md overflow-y-auto mr-2">
            <Header color={"transparent"} />
            <div
                style={{
                    backgroundColor:
                        "#" +
                        currentSong?.images?.joecolor?.split(":")[5] +
                        "90",
                }}
                className="w-full min-h-screen mt-16 flex flex-col justify-center items-center "
            >
                {currentSong?.sections?.[1]?.text?.length > 0 ? (
                    <div className="mt-10 w-[80%]">
                        {currentSong?.sections?.[1]?.text?.map(
                            (text, index) => {
                                return (
                                    <p
                                        key={index}
                                        className="text-left font-bold text-white drop-shadow-lg shadow-white text-3xl p-2 cursor-pointer hover:text-amber-300"
                                    >
                                        {text}
                                    </p>
                                );
                            }
                        )}
                    </div>
                ) : (
                    <div className="w-full justify-center flex -mt-40">
                        <p className="text-white text-[70px] font-bold w-[40%]">
                            Looks like we dont have the lyrics for this song
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Lyric;
