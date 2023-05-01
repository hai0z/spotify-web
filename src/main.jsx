/* eslint-disable react-refresh/only-export-components */
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import PlayerProvider from "./context/PlayerProvider.jsx";
import LeftPanel from "./components/Panel/LeftPanel.jsx";
import Player from "./components/Player/Player.jsx";
import Search from "./pages/Search.jsx";
import LikedSong from "./pages/LikedSong.jsx";

const MainLayout = () => {
    return (
        <PlayerProvider>
            <div className="h-screen">
                <div className="w-full bg-[#000000] flex flex-row gap-1 h-[calc(100vh-80px)]">
                    <LeftPanel />
                    <Outlet />
                </div>
                <Player />
            </div>
        </PlayerProvider>
    );
};
const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <App />,
            },
            {
                path: "/search",
                element: <Search />,
            },
            {
                path: "/collection",
                element: <LikedSong />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
