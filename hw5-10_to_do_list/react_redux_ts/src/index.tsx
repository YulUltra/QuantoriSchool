import { createRoot } from "react-dom/client";
import React from "react";
import App from "./components/App/App";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const domNode = document.getElementById("root");
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
