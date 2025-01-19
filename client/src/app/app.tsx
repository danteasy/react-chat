import React, { useEffect } from "react";
import appWebSocket from "../shared/api";

const App: React.FC<{
    children?: React.ReactNode;
}> = props => {
    useEffect(() => {
        appWebSocket.initSocket();
    }, []);
    return <div className="App">{props.children}</div>;
};

export default App;
