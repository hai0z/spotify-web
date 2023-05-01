/* eslint-disable react/prop-types */
import { useContext, createContext, useState, useEffect } from "react";
const playerContext = createContext();
import { db } from "../firebase/index";
function PlayerProvider({ children }) {
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const [expandLibrary, setExpandLibrary] = useState(true);
    const [panelWidth, setPanelWidth] = useState(380);
    const [playlist, setPlaylist] = useState([]);

    useEffect(() => {
        const getSong = async () => {
            const q = db.query(db.collection(db.getFirestore(), "likedList"));
            const track = [];
            const querySnapshot = await db.getDocs(q);
            querySnapshot.forEach((doc) => {
                track.push(doc.data());
            });
            setPlaylist(track.sort(() => 0.5 - Math.random()));
        };
        getSong();
    }, []);

    useEffect(() => {
        setCurrentSong(JSON.parse(localStorage.getItem("currentPlay")));
    }, []);
    useEffect(() => {
        localStorage.setItem("currentPlay", JSON.stringify(currentSong));
    }, [currentSong]);
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
