/* eslint-disable react/prop-types */
function Player({ item }) {
    return (
        <div className="w-full bg-black h-20 absolute bottom-0 flex flex-row justify-between">
            <div>
                <img
                    src={item?.images?.coverart}
                    alt=""
                    className="h-16 w-16 "
                />
                <span className="text-white">{item?.title}</span>
            </div>
            <div>
                <audio controls autoPlay src={item?.hub?.actions?.[1]?.uri} />
            </div>
            <div></div>
        </div>
    );
}

export default Player;
