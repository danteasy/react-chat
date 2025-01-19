import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { UsersOnlineCounter } from "../shared/ui/users-online-counter";
type UsersOnlineIconProps = {
    usersOnline: number;
};

const UsersOnlineIcon: React.FC<UsersOnlineIconProps> = ({ usersOnline }) => {
    return (
        <div className="relative pl-1 pr-3 py-2 bg-indigo-800 rounded-md">
            <FaUserFriends className="text-indigo-500 w-full h-full" />
            <UsersOnlineCounter
                usersOnline={usersOnline}
                className="text-xs absolute bottom-[0] right-[-12%] text-white"
                style={{
                    background: "transparent",
                    padding: "none",
                }}
            />
        </div>
    );
};

export default UsersOnlineIcon;
