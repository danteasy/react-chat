import React from "react";
import { TActiveUser } from "../shared/types";
import { UserListItem } from "./UserListItem";

type UserListProps = {
    activeUsers: TActiveUser[];
    clientId: number;
    handleMention?: (username: string) => void;
} & React.HTMLProps<HTMLUListElement>;

export const UserList: React.FC<UserListProps> = ({
    activeUsers,
    clientId,
    handleMention,
    ...restProps
}) => {
    return (
        <ul {...restProps}>
            {activeUsers.map(user => {
                const isThisUser = user.id === clientId;
                return (
                    <UserListItem
                        handleMention={
                            handleMention
                                ? () => handleMention(user.name)
                                : undefined
                        }
                        username={user.name}
                        key={user.id}
                        isThisUser={isThisUser}
                    />
                );
            })}
        </ul>
    );
};
