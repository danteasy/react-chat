import React from "react";
import { TChatMessage } from "src/shared/types";
import { MessagesListItem } from "./messages-list-item";
import { wrapMatchesWithSpan } from "../lib/wrap-matches-with-span";

type MessagesListProps = {
    messages: TChatMessage[];
    clientId: number;
    clientNameRegex: RegExp;
} & React.HTMLProps<HTMLUListElement>;

export const MessagesList: React.FC<MessagesListProps> = React.memo(
    ({ messages, clientId, clientNameRegex, ...restProps }) => {
        return (
            <ul
                className="[&>li:not(:last-child)]:mb-2 [&>li:last-child]:animate-slideIn"
                {...restProps}
            >
                {messages.map(message => {
                    const isThisUser = message.id === clientId;
                    let msg = isThisUser
                        ? message
                        : {
                              ...message,
                              message: wrapMatchesWithSpan(
                                  clientNameRegex,
                                  message.message
                              ),
                          };

                    return (
                        <MessagesListItem
                            message={msg}
                            key={msg.date}
                            className={`${
                                isThisUser
                                    ? "justify-end [&>div]:bg-indigo-500"
                                    : "justify-start [&>div]:bg-indigo-700"
                            }`}
                        >
                            {isThisUser ? null : (
                                <div className="pb-1 text-indigo-300">
                                    {msg.name}
                                </div>
                            )}
                        </MessagesListItem>
                    );
                })}
            </ul>
        );
    }
);
