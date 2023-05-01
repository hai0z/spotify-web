import React from "react";
import Header from "../components/header/Header";
function LikedSong() {
    return (
        <div className="w-full bg-[#121212] my-2 pb-4 rounded-md overflow-y-auto mr-2">
            <div>
                <Header color={""} />
                <div
                    style={{
                        background: `linear-gradient(to bottom,  #1c0f3f 0%,transparent 100%)`,
                    }}
                    className={`w-full h-96 px-6 transition-colors duration-200 rounded-md pt-16 `}
                ></div>
            </div>
        </div>
    );
}

export default LikedSong;
