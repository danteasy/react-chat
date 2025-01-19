import { Home } from "src/pages/home";
import { Chat } from "src/pages/chat/ui";
import { createBrowserRouter, RouteObject } from "react-router-dom";

const routesConfig: RouteObject[] = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/chat",
        element: <Chat />,
    },
];

const routes = createBrowserRouter(routesConfig);

export default routes;
