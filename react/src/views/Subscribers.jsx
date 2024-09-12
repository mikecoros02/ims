import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Subscribers() {
    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();

    useEffect(() => {
        getSubscribers();
    }, []);

    const onDelete = (subscriber) => {
        if (
            !window.confirm("Are you sure you want to delete this subscriber?")
        ) {
            return;
        }

        axiosClient.delete(`/subscriber/${subscriber.phoneNumber}`).then(() => {
            setNotification("Subscriber was successfully deleted");
            getSubscribers();
        });
    };

    const getSubscribers = () => {
        setLoading(true);
        axiosClient
            .get("/subscriber")
            .then(({ data }) => {
                setLoading(false);
                console.log(data);
                setSubscribers(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1>Subscribers</h1>
                <Link to="/subscriber/new" className="btn-add">
                    Add New or Update Existing Phone Number
                </Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>Phone Number</th>
                            <th>Username</th>
                            <th>Domain</th>
                            <th>Status</th>
                            <th>Features</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {loading && (
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    )}
                    {!loading && (
                        <tbody>
                            {subscribers.map((subscriber) => (
                                <tr key={subscriber.id}>
                                    <td>{subscriber.phoneNumber}</td>
                                    <td>{subscriber.username}</td>
                                    <td>{subscriber.domain}</td>
                                    <td>{subscriber.status}</td>
                                    <td>{subscriber.features}</td>
                                    <td>
                                        <Link
                                            className="btn-edit"
                                            to={
                                                "/subscriber/" +
                                                subscriber.phoneNumber
                                            }
                                        >
                                            View
                                        </Link>
                                        &nbsp;
                                        <button
                                            onClick={(e) =>
                                                onDelete(subscriber)
                                            }
                                            className="btn-delete"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}
