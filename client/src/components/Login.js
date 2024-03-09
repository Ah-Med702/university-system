import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import PasswordInput from "./tools/password";
import "./styles/LoginPage.css";
import "./styles/Loading.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const API = "https://bondok-university-system-server.vercel.app";

    useEffect(() => {
        document.title = "Login Page";
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${API}/login`, {
                username,
                password,
                role,
            });

            const { data } = response;

            if (data.message === "Login successful") {
                const { user } = data;
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Login successful!",
                });
                sessionStorage.setItem("user", JSON.stringify(user));

                if (role === "admin") {
                    sessionStorage.setItem(
                        "adminData",
                        JSON.stringify({ username, role })
                    );
                    navigate("/admin");
                } else if (role === "user") {
                    sessionStorage.setItem(
                        "userData",
                        JSON.stringify({ username, role })
                    );
                    navigate(`/user/${user._id}`);
                }
            }
        } catch (error) {
            let errorMessage = "Something went wrong!";

            if (error.response) {
                errorMessage = error.response.data.message || errorMessage;
            }

            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: errorMessage,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="container-fluid">
                <div className="row justify-content-center align-items-center vh-100">
                    <div className="col-sm-10 col-md-8 col-lg-6">
                        <div className="form-container bg-white shadow p-3 rounded">
                            {loading && <div className="loading"></div>}
                            <h2 className="mb-3 text-primary text-center">
                                Login
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label
                                        htmlFor="username"
                                        className="form-label"
                                    >
                                        <strong>Username</strong>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter username"
                                        className="form-control"
                                        id="username"
                                        onChange={(event) =>
                                            setUsername(event.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="password"
                                        className="form-label"
                                    >
                                        <strong>Password</strong>
                                    </label>
                                    <PasswordInput
                                        value={password}
                                        onChange={(event) =>
                                            setPassword(event.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="exampleDropdownSelect1"
                                        className="form-label"
                                    >
                                        <strong>Role</strong>
                                    </label>
                                    <select
                                        className="form-select"
                                        id="exampleDropdownSelect1"
                                        onChange={(event) =>
                                            setRole(event.target.value)
                                        }
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                                <div className="d-grid">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
