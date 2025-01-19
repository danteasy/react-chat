import ReactDOM from "react-dom/client";

import "src/app/global.css";
import App from "src/app/app";

import { Provider as StoreProvider } from "react-redux";
import store from "src/app/store";

import { RouterProvider } from "react-router-dom";
import routes from "src/app/routes";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <StoreProvider store={store}>
        <App>
            <RouterProvider router={routes} />
        </App>
    </StoreProvider>
);
