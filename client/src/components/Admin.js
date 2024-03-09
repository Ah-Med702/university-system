import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import "./styles/Blur.css";

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [, setDeletedUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const API = "https://bondok-university-system-server.vercel.app";

    useEffect(() => {
        const adminData = sessionStorage.getItem("adminData");
        if (!adminData) {
            setIsModalOpen(true);
            Swal.fire({
                icon: "warning",
                title: "Please login first",
                text: "You need to login to access the admin page",
                didClose: () => {
                    navigate("/login");
                },
            });
        } else {
            getUsers();
        }
    }, [navigate]);

    useEffect(() => {
        getUsers();
    }, [users]);

    useEffect(() => {
        document.title = "Admin Page";
    }, []);

    const getUsers = () => {
        axios
            .get(`${API}/users`)
            .then((response) => {
                setUsers(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
                setIsLoading(false);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to fetch users. Please try again later.",
                });
            });
    };

    const deleteUser = (id) => {
        let deletedUser;

        Swal.fire({
            icon: "warning",
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${API}/deleteUser/${id}`).then(() => {
                    const userToDelete = users.find((user) => user._id === id);
                    deletedUser = userToDelete;
                    setDeletedUser(userToDelete);
                    getUsers();
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "User deleted successfully!",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Undo",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            axios
                                .post(`${API}/admin/addUser`, deletedUser)
                                .then(() => {
                                    setDeletedUser(null);
                                    getUsers();
                                    Swal.fire({
                                        icon: "success",
                                        title: "Undo Successful",
                                        text: "User has been restored!",
                                    });
                                })
                                .catch((error) => {
                                    console.error("Error adding user:", error);
                                    Swal.fire({
                                        icon: "error",
                                        title: "Error",
                                        text: "Failed to undo deletion. Please try again later.",
                                    });
                                });
                        }
                    });
                });
            }
        });
    };

    const handleLogout = () => {
        Swal.fire({
            title: "Logout",
            text: "Are you sure you want to logout?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, logout",
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
            }
        });
    };

    const logout = () => {
        sessionStorage.removeItem("adminData");
        navigate("/login");
    };

    return (
        <div className="admin-page">
            <div className={isModalOpen ? "blur-container" : ""}>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="#">
                            Admin Panel
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div
                            className="collapse navbar-collapse"
                            id="navbarNav"
                        >
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="container-fluid p-3">
                    <div className="row">
                        <div className="col">
                            <div className="header d-flex align-items-center justify-content-between">
                                <h3>Registered Users</h3>
                                <Link
                                    to="/admin/addUser"
                                    className="btn btn-primary"
                                >
                                    Add User
                                </Link>
                            </div>
                            {isLoading ? (
                                <div>Loading...</div>
                            ) : (
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Username</th>
                                            <th>Password</th>
                                            <th>Role</th>
                                            <th>Action</th>
                                            <th>Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => (
                                            <tr key={user._id}>
                                                <td>
                                                    {
                                                        user.userRegistration
                                                            .username
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        user.userRegistration
                                                            .password
                                                    }
                                                </td>
                                                <td>
                                                    {user.userRegistration.role}
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() =>
                                                            deleteUser(user._id)
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                                <td>
                                                    <Link
                                                        to={`/userDetails/${user._id}`}
                                                    >
                                                        Details
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
