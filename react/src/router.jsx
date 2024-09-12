import { createBrowserRouter, Navigate } from "react-router-dom";

import NotFound from "./views/NotFound.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import Subscribers from "./views/Subscribers.jsx";
import Subscriber from "./views/Subscriber.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/subscribers" />,
            },
            {
                path: "/subscribers",
                element: <Subscribers />,
            },
            {
                path: "/subscriber/new",
                element: <Subscriber key="subscriberCreate" />,
            },
            {
                path: "/subscriber/:phoneNumber",
                element: <Subscriber key="subscriberUpdate" />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
