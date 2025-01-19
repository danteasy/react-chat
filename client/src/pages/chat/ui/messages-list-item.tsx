import React from "react";
import { TChatMessage } from "src/shared/types";
import { unixToHHMM } from "src/shared/lib/unix-to-hhmm";
import parse from "html-react-parser";

type MessagesListItemProps = {
    message: TChatMessage;
} & React.HTMLProps<HTMLLIElement>;

export const MessagesListItem: React.FC<MessagesListItemProps> = ({
    message,
    children,
    className = "",
}) => {
    return (
        <li className={`flex ${className}`}>
            <div className="max-w-[75%] sm:max-w-[100%] flex flex-col px-2 py-2 rounded-md message-list-item">
                {children}
                <div className="flex">
                    <p className="break-words [&>span]:py-[0.15rem] [&>span]:px-1 [&>span]:bg-indigo-400 [&>span]:text-white [&>span]:rounded-md [&>span]:inline-block">
                        {parse(message.message)}
                    </p>
                    <span className="self-end text-xs ml-2 text-gray-300">
                        {unixToHHMM(message.date)}
                    </span>
                </div>
            </div>
        </li>
    );
};
