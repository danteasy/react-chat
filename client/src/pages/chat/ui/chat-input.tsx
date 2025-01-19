import React, {
    useRef,
    useEffect,
    SetStateAction,
    Dispatch,
    useState,
} from "react";
import { DropdownList } from "src/shared/ui/dropdown-list";
import { TActiveUser } from "src/shared/types";

type ChatInputProps = {
    setMessageValue: Dispatch<SetStateAction<string>>;
    messageValue: string;
    activeUsers: TActiveUser[];
    handleSendMessage: () => void;
    handleTyping: () => void;
    handleInputMention: (username: string, start: number, end: number) => void;
} & React.HTMLProps<HTMLDivElement>;

export const ChatInput: React.FC<ChatInputProps> = ({
    setMessageValue,
    messageValue,
    activeUsers,
    handleSendMessage,
    handleInputMention,
    handleTyping,
}) => {
    const [lastAtPosition, setLastAtPosition] = useState<number | undefined>(
        undefined
    );

    const textAreaRef = useRef<null | HTMLTextAreaElement>(null);

    const mentionValue = messageValue
        .slice(lastAtPosition! + 1, textAreaRef.current?.selectionEnd)
        .trim();

    const doesAtStandBeforeTheCursor =
        messageValue.charAt(
            textAreaRef.current?.selectionStart! - mentionValue.length - 1
        ) === "@";

    const matchedUsers = activeUsers.filter(user =>
        user.name.startsWith(mentionValue)
    );

    const handleMention = (username: string) => {
        handleInputMention(
            username + " ",
            lastAtPosition! + 1,
            messageValue.length
        );
        textAreaRef.current?.focus();
    };

    useEffect(() => {
        const textArea = textAreaRef.current;
        if (textArea) {
            textArea.style.height = "auto";
            textArea.style.height =
                textArea.scrollHeight > window.innerHeight / 4
                    ? window.innerHeight / 4 + "px"
                    : textArea.scrollHeight + "px";
        }
    }, [messageValue]);

    return (
        <div className="border-b-2 border-indigo-600 bg-bg-primary py-2 flex gap-2 pb-1 items-center bottom-0 left-0 mb-2 w-full">
            {doesAtStandBeforeTheCursor && matchedUsers.length ? (
                <DropdownList
                    className="absolute top-[-50%] rounded-md left-0 w-full flex gap-4 [&>li]:p-1 [&>li]:bg-indigo-600 [&>li]:rounded-md py-1 px-2 bg-indigo-800 overflow-x-auto [&>li]:cursor-pointer"
                    colorOnSelect="gray"
                    listItems={matchedUsers.map(item => ({
                        item: item,
                        label: item.name,
                        key: item.id,
                    }))}
                    listItemOnClickCb={item => {
                        handleMention(item.name);
                    }}
                    listItemOnSelectCb={item => {
                        handleMention(item.name);
                    }}
                    listOnEscape={() => {
                        textAreaRef.current?.focus();
                    }}
                />
            ) : null}
            <textarea
                ref={textAreaRef}
                value={messageValue}
                onChange={e => {
                    setMessageValue(e.target.value);
                }}
                onKeyDown={e => {
                    handleTyping();
                    if (
                        e.key === "@" ||
                        messageValue.charAt(
                            textAreaRef.current?.selectionStart!
                        ) === "@"
                    ) {
                        setLastAtPosition(textAreaRef.current?.selectionStart);
                    }
                    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                        handleSendMessage();
                    }
                }}
                placeholder="Your message"
                rows={1}
                className={`w-full bg-transparent placeholder:text-white placeholder:transition-opacity focus:placeholder:opacity-0 resize-none max-h-[27.5vh]`}
            ></textarea>
            <div className="text-center rounded-md">
                <button
                    disabled={!messageValue.trim()}
                    className={`px-3 rounded-md py-2 mb-2transition-colors cursor-pointer hover:bg-indigo-800 hover:text-gray-200 ${
                        !messageValue.trim()
                            ? "bg-gray-600"
                            : " bg-indigo-600 hover:bg-indigo-700 hover:text-gray-200"
                    }`}
                    onClick={() => handleSendMessage()}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatInput;
