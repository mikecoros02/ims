import { Link, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function DefaultLayout() {
    const { notification } = useStateContext();

    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/subscribers" className="active">
                    Subscribers
                </Link>
            </aside>
            <div className="content">
                <header>
                    <h1>IMS</h1>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>

            {notification && <div className="notification">{notification}</div>}
        </div>
    );
}
