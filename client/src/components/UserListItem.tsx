import React from "react";
import { VscMention } from "react-icons/vsc";
import { ButtonWithLabelOnClick } from "src/shared/ui/button-with-label-on-click";

type UserListItemProps = {
    username: string;
    isThisUser: boolean;
    handleMention?: () => void;
} & React.HTMLProps<HTMLLIElement>;

export const UserListItem: React.FC<UserListItemProps> = ({
    username,
    handleMention,
    isThisUser,
}) => {
    return (
        <li
            className={`relative ${
                isThisUser ? "bg-indigo-500" : "bg-indigo-700"
            }`}
        >
            <span className="">{username}</span>
            {!isThisUser && handleMention ? (
                <ButtonWithLabelOnClick
                    timeoutInMs={2000}
                    onClickCb={handleMention}
                    label="Mentioned!"
                    className={`inline-block rounded-md float-right
                bg-indigo-500
           `}
                    labelClassName="bg-indigo-700 rounded-md w-full top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] transition-opacity"
                >
                    <VscMention size="1.5rem" />
                </ButtonWithLabelOnClick>
            ) : null}
        </li>
    );
};
