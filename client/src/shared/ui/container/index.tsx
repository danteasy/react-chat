import React from "react";

type ContainerProps = {
    children: React.ReactNode;
} & React.HTMLProps<HTMLDivElement>;

export const Container: React.FC<ContainerProps> = props => {
    return (
        <div className="container max-w-[1200px] mx-auto px-[0.3rem]">
            {props.children}
        </div>
    );
};
