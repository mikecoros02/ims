import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Subscriber() {
    const { phoneNumber } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const { setNotification } = useStateContext();
    const [subscriber, setSubscriber] = useState({
        phoneNumber: null,
        username: null,
        password: "",
        domain: "",
        status: "ACTIVE",
        features: "",
    });

    if (phoneNumber) {
        useEffect(() => {
            setLoading(true);
            axiosClient
                .get(`/subscriber/${phoneNumber}`)
                .then(({ data }) => {
                    setLoading(false);
                    setSubscriber(data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }, []);
    }

    const showPassword = () => {
        var password = document.getElementById("password");
        if (password.type === "password") {
            password.type = "text";
        } else {
            password.type = "password";
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (subscriber.phoneNumber) {
            axiosClient
                .put(`subscriber/${subscriber.phoneNumber}`, subscriber)
                .then(() => {
                    setNotification(
                        "Subscriber was successfully added/updated"
                    );
                    navigate("/subscribers");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    return (
        <>
            {phoneNumber && (
                <h2>
                    Get Phone Number: {phoneNumber} &nbsp;
                    <small>
                        (Phone number is now read only and cannot be updated)
                    </small>
                </h2>
            )}
            {!phoneNumber && (
                <h2>
                    Add New or Update Existing Subscriber by adding the existing
                    Phone Number
                </h2>
            )}
            <div className="card animated fadeInDown">
                {loading && <div className="text-center">Loading...</div>}
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                {!loading && (
                    <form onSubmit={onSubmit}>
                        {phoneNumber && (
                            <input
                                defaultValue={subscriber.phoneNumber}
                                readOnly
                            />
                        )}
                        {!phoneNumber && (
                            <input
                                defaultValue={subscriber.phoneNumber}
                                placeholder="phoneNumber"
                                onChange={(e) =>
                                    setSubscriber({
                                        ...subscriber,
                                        phoneNumber: e.target.value,
                                    })
                                }
                            />
                        )}
                        <input
                            defaultValue={subscriber.username}
                            onChange={(e) =>
                                setSubscriber({
                                    ...subscriber,
                                    username: e.target.value,
                                })
                            }
                            placeholder="username"
                        />
                        <input
                            type="password"
                            id="password"
                            defaultValue={subscriber.password}
                            onChange={(e) =>
                                setSubscriber({
                                    ...subscriber,
                                    password: e.target.value,
                                })
                            }
                            placeholder="password"
                        />
                        <input type="checkbox" onClick={showPassword} />
                        Show Password
                        <input
                            defaultValue={subscriber.domain}
                            onChange={(e) =>
                                setSubscriber({
                                    ...subscriber,
                                    domain: e.target.value,
                                })
                            }
                            placeholder="domain"
                        />
                        <select
                            defaultValue={subscriber.status}
                            onChange={(e) =>
                                setSubscriber({
                                    ...subscriber,
                                    status: e.target.value,
                                })
                            }
                        >
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="INACTIVE">INACTIVE</option>
                        </select>
                        <input
                            defaultValue={subscriber.features}
                            onChange={(e) =>
                                setSubscriber({
                                    ...subscriber,
                                    features: e.target.value,
                                })
                            }
                            placeholder="features"
                        />
                        <button className="btn">Update</button>
                    </form>
                )}
            </div>
        </>
    );
}
