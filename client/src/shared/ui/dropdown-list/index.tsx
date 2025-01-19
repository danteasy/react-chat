import React, { useEffect, useState } from "react";

export type DropdownListItem<T> = {
    item: T;
    label: string;
    key: string | number;
};

type DropdownListProps<T> = {
    listItems: DropdownListItem<T>[];
    listItemOnClickCb?: (item: T) => void;
    listItemOnSelectCb?: (item: T) => void;
    listOnEscape?: () => void;
    colorOnSelect?: string;
} & React.HTMLProps<HTMLUListElement>;

export const DropdownList = <T extends {}>({
    listItems = [],
    listItemOnClickCb,
    listItemOnSelectCb,
    listOnEscape,
    colorOnSelect,
    ...restProps
}: DropdownListProps<T>) => {
    const [selectedOption, setSelectedOption] = useState<number>(0);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case "ArrowUp":
                    selectedOption !== 0 && setSelectedOption(prev => prev - 1);
                    break;
                case "ArrowDown":
                    selectedOption < listItems.length - 1 &&
                        setSelectedOption(prev => prev + 1);
                    break;
                case "Enter":
                    event.preventDefault();
                    listItemOnSelectCb &&
                        listItemOnSelectCb(listItems[selectedOption].item);
                    break;
                case "Escape":
                    listOnEscape && listOnEscape();
                    break;
                default:
                    break;
            }
        };
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedOption, listItems, listItemOnSelectCb, listOnEscape]);

    return (
        <ul {...restProps}>
            {listItems.map((listItem, index) => {
                return (
                    <li
                        key={listItem.key}
                        onClick={() =>
                            listItemOnClickCb &&
                            listItemOnClickCb(listItem.item)
                        }
                        style={
                            index === selectedOption && colorOnSelect
                                ? {
                                      backgroundColor: colorOnSelect,
                                  }
                                : undefined
                        }
                    >
                        {listItem.label}
                    </li>
                );
            })}
        </ul>
    );
};
