import React, { useEffect, useRef, useMemo } from "react";
import { Container } from "src/shared/ui/container";
import { useAppSelector } from "src/shared/store";
import { UserList } from "../../../components/UserList";
import { MessagesList } from "./messages-list";
import { TypingUsersString } from "./typing-users-string";
import { UsersOnlineCounter } from "src/shared/ui/users-online-counter";
import { useMediaQuery } from "react-responsive";
import { FullscreenBurgerMenu } from "src/shared/ui/fullscreen-burger-menu";
import ChatInput from "./chat-input";
import { useMessageSending } from "../model/use-message-sending";
import UsersOnlineIcon from "../../../components/UsersOnlineIcon";

type ChatProps = {};

export const Chat: React.FC<ChatProps> = props => {
    const { activeUsers, messages, clientId, clientName, typingUsers } =
        useAppSelector(state => state.chat);

    const { messageValue, setMessageValue, handleSendMessage, handleTyping } =
        useMessageSending();

    const clientNameRegex = useMemo(
        () => new RegExp(`@${clientName}`, "g"),
        [clientName]
    );

    const screenLessThan767px = useMediaQuery({ maxWidth: "767px" });

    const handleMention = (username: string) => {
        const valueToAdd = messageValue.endsWith(" ")
            ? `@${username}`
            : ` @${username}`;
        setMessageValue(prev => prev + valueToAdd);
    };

    const handleInputMention = (
        username: string,
        start: number,
        end: number
    ) => {
        setMessageValue(
            messageValue.slice(0, start) +
                username +
                messageValue.slice(start, end)
        );
    };

    const messagesContainerRef = useRef<HTMLDivElement | null>(null);
    const messagesContainerScrollRef = useRef<boolean>(false);

    useEffect(() => {
        const messagesContainer = messagesContainerRef.current;

        if (messagesContainer) {
            if (messagesContainerScrollRef.current) {
                messagesContainer.scroll({
                    top: messagesContainer.scrollHeight,
                    behavior: "smooth",
                });
            }
            const handleScroll = () => {
                messagesContainerScrollRef.current =
                    messagesContainer.scrollHeight -
                        messagesContainer.scrollTop ===
                    messagesContainer.clientHeight;
            };

            messagesContainer.addEventListener("scroll", handleScroll);

            return () => {
                messagesContainer.removeEventListener("scroll", handleScroll);
            };
        }
    }, [messages.length]);

    return (
        <Container>
            <div
                className={`flex ${
                    screenLessThan767px ? "gap-1" : "gap-4"
                } pt-4 max-h-[100vh] min-h-[98vh] justify-between md:flex-col md:pt-2`}
            >
                {!screenLessThan767px ? (
                    <div className="max-w-[300px] flex-shrink-0 overflow-hidden">
                        <div className="mb-3 pb-1 border-b-2 border-b-indigo-600 ">
                            <span className="mr-2">Users online</span>
                            <UsersOnlineCounter
                                usersOnline={activeUsers.length}
                            />
                        </div>
                        <UserList
                            handleMention={handleMention}
                            activeUsers={activeUsers}
                            clientId={clientId!}
                            className="[&>li:not(:last-child)]:mb-2 [&>li]:px-1 [&>li]:py-1 [&>li]:rounded-md text-center max-h-full overflow-y-auto"
                        />
                    </div>
                ) : (
                    <FullscreenBurgerMenu
                        burgerWidth="36px"
                        burgerHeight="36px"
                        burgerIcon={
                            <UsersOnlineIcon usersOnline={activeUsers.length} />
                        }
                    >
                        <div className="mb-3 pb-1 border-b-2 border-b-indigo-600 text-center">
                            <span className="mr-2">Users online</span>
                            <UsersOnlineCounter
                                usersOnline={activeUsers.length}
                            />
                        </div>
                        <UserList
                            handleMention={handleMention}
                            activeUsers={activeUsers}
                            clientId={clientId!}
                            className="[&>li:not(:last-child)]:mb-2 [&>li]:px-2  [&>li]:py-2 [&>li]:rounded-md text-center"
                        />
                    </FullscreenBurgerMenu>
                )}

                <div className="relative max-w-[1080px] grow min-h-full overflow-hidden max-h-[100vh] flex flex-col justify-between">
                    <div
                        className="min-h-[50vh] max-h-[90vh] overflow-y-auto"
                        ref={messagesContainerRef}
                    >
                        <MessagesList
                            clientNameRegex={clientNameRegex}
                            messages={messages}
                            clientId={clientId!}
                        />
                    </div>
                    <div className="relative">
                        {!!typingUsers.length && (
                            <TypingUsersString typingUsers={typingUsers} />
                        )}
                        <ChatInput
                            activeUsers={activeUsers.filter(
                                user => user.id !== clientId
                            )}
                            handleInputMention={handleInputMention}
                            messageValue={messageValue}
                            setMessageValue={setMessageValue}
                            handleSendMessage={handleSendMessage}
                            handleTyping={handleTyping}
                        />
                    </div>
                </div>
            </div>
        </Container>
    );
};
