import React, { useEffect, useRef, useState } from "react";

import { useAppDispatch } from "src/shared/store";
//TODO: change route
import { setName } from "../../app/store/slices/ChatSlice";
import { Input } from "src/shared/ui/input";
import { FaArrowDownLong } from "react-icons/fa6";

import appWebSocket from "src/shared/api";

import bubble from "./assets/message-bubble.png";
import { useNavigate } from "react-router-dom";
import { Container } from "../../shared/ui/container";

type HomeProps = {};

export const Home: React.FC<HomeProps> = props => {
    const [username, setUsername] = useState<string>("");
    const inputRef = useRef<null | HTMLInputElement>(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = () => {
        dispatch(setName(username.trim()));
        appWebSocket.setName(username.trim());
        navigate("/chat");
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, []);
    return (
        <>
            <div className="purple-fade min-h-[100vh]">
                <Container>
                    <div className="flex justify-center items-center">
                        <div className="mt-[10vh]">
                            <img
                                src={bubble}
                                draggable={false}
                                alt="bubble-icon"
                                className="max-w-[400px] drop-shadow-purple"
                            />
                            <span className="text-[2.5rem] font-semibold block">
                                Connect to the chat
                            </span>
                            <FaArrowDownLong
                                size="2.5rem"
                                className="text-whitesmoke block mx-auto mt-2 mb-4"
                            />
                            <div className="flex justify-center">
                                <Input
                                    placeholder="Enter your name to join"
                                    ref={inputRef}
                                    onSubmitCb={() => {
                                        handleSubmit();
                                    }}
                                    className={`placeholder:text-gray-200 bg-primary rounded-l-md px-2 py-2 h-full focus:placeholder:opacity-50 placeholder:transition-opacity`}
                                    onChange={e => setUsername(e.target.value)}
                                    value={username}
                                />
                                <button
                                    onClick={() => {
                                        handleSubmit();
                                    }}
                                    className={`cursor-pointer bg-primary rounded-r-md px-3 py-2 hover:bg-indigo-800  ${
                                        !username && "text-gray-400"
                                    }`}
                                    disabled={username ? false : true}
                                >
                                    Join
                                </button>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
};
