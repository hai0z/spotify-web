/* eslint-disable react/prop-types */
import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
const playerContext = createContext();

function PlayerProvider({ children }) {
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const [expandLibrary, setExpandLibrary] = useState(true);
    const [panelWidth, setPanelWidth] = useState(380);
    const [playlist, setPlaylist] = useState([]);

    useEffect(() => {
        setCurrentSong(JSON.parse(localStorage.getItem("currentPlay")));
    }, []),
        useEffect(() => {
            localStorage.setItem("currentPlay", JSON.stringify(currentSong));
        }, [currentSong]);

    useEffect(() => {
        const getPlaylist = async () => {
            const options = {
                method: "GET",
                url: "https://shazam-core.p.rapidapi.com/v1/charts/country",
                params: { country_code: "VN" },
                headers: {
                    "content-type": "application/octet-stream",
                    "X-RapidAPI-Key":
                        "52ebb81b22mshc9be28dfa4b3296p16ee67jsn63e7322d5732",
                    "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
                },
            };

            try {
                const response = await axios.request(options);
                setPlaylist(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        getPlaylist();
    }, []);

    const defaultValue = {
        currentSong,
        setCurrentSong,
        isPlaying,
        setIsPlaying,
        expandLibrary,
        setExpandLibrary,
        playlist,
        setPlaylist,
        panelWidth,
        setPanelWidth,
    };
    return (
        <playerContext.Provider value={defaultValue}>
            <div>{children}</div>
        </playerContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const usePlayerContext = () => {
    return useContext(playerContext);
};
export default PlayerProvider;
