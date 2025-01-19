import { useState, useEffect, useRef } from "react";
import appWebSocket from "src/shared/api";

export const useMessageSending = () => {
    const [messageValue, setMessageValue] = useState<string>("");
    const [isTyping, setIsTyping] = useState<boolean>(false);

    const handleSendMessage = () => {
        if (messageValue.trim()) {
            appWebSocket.sendMessage(messageValue);
            setMessageValue("");
            setIsTyping(false);
        }
    };

    const typingTimeoutRef = useRef<number | null>(null);

    const handleTyping = () => {
        setIsTyping(true);
        if (typingTimeoutRef.current) {
            window.clearTimeout(typingTimeoutRef.current);
        }
        const timeout = window.setTimeout(() => {
            setIsTyping(false);
        }, 2000);
        typingTimeoutRef.current = timeout;
    };

    useEffect(() => {
        appWebSocket.setTyping(isTyping);
    }, [isTyping]);

    return {
        messageValue,
        setMessageValue,
        isTyping,
        handleSendMessage,
        handleTyping,
    };
};
