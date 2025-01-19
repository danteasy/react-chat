import React, { forwardRef } from "react";

type InputProps = {
    onSubmitCb: Function;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { onSubmitCb, ...restProps } = props;

    const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && (e.target as HTMLInputElement).value.trim()) {
            onSubmitCb();
        }
    };

    return (
        <input
            ref={ref}
            type="text"
            onKeyDown={e => {
                handleSubmit(e);
            }}
            {...restProps}
        />
    );
});
