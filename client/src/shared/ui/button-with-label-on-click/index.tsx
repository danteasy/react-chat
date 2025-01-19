import React, { useEffect, useState } from "react";

type ButtonWithLabelOnClickProps = {
    className?: string;
    labelClassName?: string;
    onClickCb: () => void;
    label: string;
    timeoutInMs?: number;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonWithLabelOnClick: React.FC<ButtonWithLabelOnClickProps> = ({
    className = "",
    labelClassName,
    onClickCb,
    children,
    label,
    timeoutInMs = 3000,
    ...restProps
}) => {
    const [isLabelShown, setIsLabelShown] = useState<boolean>(false);

    const handleClick = () => {
        setIsLabelShown(true);
        onClickCb();
    };

    useEffect(() => {
        if (isLabelShown) {
            const timeout = setTimeout(() => {
                setIsLabelShown(false);
            }, timeoutInMs);

            return () => {
                clearTimeout(timeout);
            };
        }
    }, [isLabelShown]);
    return (
        <button
            className={`${className}`}
            onClick={() => handleClick()}
            {...restProps}
        >
            {children}
            <span
                className={`absolute ${
                    !!isLabelShown
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                } ${labelClassName}`}
            >
                {label}
            </span>
        </button>
    );
};
