import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

type FullscreenBurgerMenuProps = {
    children: React.ReactNode;
    burgerIcon: React.ReactNode;
    burgerWidth: string;
    burgerHeight: string;
} & React.HTMLProps<HTMLDivElement>;

export const FullscreenBurgerMenu: React.FC<FullscreenBurgerMenuProps> = ({
    burgerIcon,
    children,
    burgerWidth,
    burgerHeight,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <div className="">
            <div
                style={{ maxWidth: burgerWidth, maxHeight: burgerHeight }}
                onClick={() => setIsOpen(prev => !prev)}
            >
                {burgerIcon}
            </div>
            <div
                className={`fixed pt-2 transition-all duration-300 top-0 left-0 w-[100vw] h-[100vh] bg-bg-primary z-10 px-[0.3rem] ${
                    isOpen
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-full pointer-events-none"
                }`}
            >
                <div
                    className="mb-1"
                    style={{ maxWidth: burgerWidth, maxHeight: burgerHeight }}
                >
                    <IoClose
                        className="font-bold self-start flex-shrink-0 rounded-md bg-indigo-700 text-center h-full w-full"
                        onClick={() => setIsOpen(false)}
                    />
                </div>
                <div className="overflow-y-auto">{children}</div>
            </div>
        </div>
    );
};
