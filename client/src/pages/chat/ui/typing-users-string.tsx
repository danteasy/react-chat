import React from "react";
import { TypingDots } from "../../../shared/ui/typing-dots/typing-dots";
import { typingUser } from "../../../shared/types";

type TypingUsersListProps = {
    typingUsers: typingUser[];
};

export const TypingUsersString: React.FC<TypingUsersListProps> = ({
    typingUsers,
}) => {
    const typingUsersString = typingUsers
        .reduce((acc, currentUser) => {
            acc.push(currentUser.name);
            return acc;
        }, [] as string[])
        .join(", ");
    return (
        <div className="flex items-center">
            <TypingDots />
            <span>{typingUsersString}</span>
        </div>
    );
};
