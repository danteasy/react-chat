import React from "react";

import "./typing-dots.css";

export const TypingDots: React.FC = () => {
    return (
        <div className="typing">
            <div className="typing__dot"></div>
            <div className="typing__dot"></div>
            <div className="typing__dot"></div>
        </div>
    );
};
