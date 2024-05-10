import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/home/home";
import Detail from "./pages/detail/detail";
import Notfound from "./pages/notfound/notfound";
import Layout from "./components/layout/layout";

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/detail/:cripto",
                element: <Detail/>
            },
            {
                path: "*",
                element: <Notfound/>
            }
            
        ]
    }
])

export { router }