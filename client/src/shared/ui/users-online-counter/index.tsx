import React from "react";

type UsersOnlineCounterProps = {
    usersOnline: number;
} & React.HTMLProps<HTMLSpanElement>;

export const UsersOnlineCounter: React.FC<UsersOnlineCounterProps> = ({
    usersOnline,
    className = "",
    ...restProps
}) => {
    return (
        <span
            {...restProps}
            className={`px-2 bg-indigo-700 rounded-full ${className}`}
        >
            {usersOnline}
        </span>
    );
};
