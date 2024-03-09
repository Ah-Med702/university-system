/* eslint-disable jsx-a11y/anchor-is-valid */
import "./styles/User.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Modal, Button, Form } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faUser,
    faTableList,
    faSquarePollVertical,
    faRankingStar,
    faTriangleExclamation,
    faWallet,
    faMoneyBill,
    faGear,
} from "@fortawesome/free-solid-svg-icons";

const User = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [userData, setUserData] = useState({});
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const API = "https://bondok-university-system-server.vercel.app";

    useEffect(() => {
        document.title = "User Page";
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API}/user/${id}`);
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchData();
    }, [id]);

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
        setOldPassword("");
        setNewPassword("");
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `${API}/change-password/${userData._id}`,
                {
                    oldPassword,
                    newPassword,
                }
            );
            if (response.data.message === "Password changed successfully") {
                Swal.fire({
                    title: "Success",
                    text: "Password changed successfully",
                    icon: "success",
                });
                // Clear input fields after successful password change
                setOldPassword("");
                setNewPassword("");
            } else {
                console.log(response.data);
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: error.response.data.message,
                icon: "error",
            });
        }
    };

    const toggleOldPasswordVisibility = () => {
        setShowOldPassword(!showOldPassword);
    };
    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
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
        sessionStorage.removeItem("userData");
        navigate("/login");
    };

    const renderUserData = (sectionTitle, sectionData) => {
        return (
            <div className="p-1 col-lg-6">
                <div className="bg-primary-subtle h-100 p-2 rounded">
                    <h5>{sectionTitle}</h5>
                    <ul className="list-group ">
                        {sectionData &&
                            Object.entries(sectionData).map(([key, value]) => (
                                <li
                                    key={key}
                                    className="list-group-item d-flex justify-content-between align-items-center"
                                >
                                    <span className="me-2">{key}:</span>
                                    <span>{value}</span>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        );
    };

    return (
        <div className="user-page">
            <header>
                <div className="container-fluid">
                    {/* Navbar */}
                    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
                        <div className="container-fluid">
                            <div className="d-flex gap-2">
                                <button
                                    className="navbar-toggler"
                                    type="button"
                                    onClick={toggleSidebar}
                                >
                                    <FontAwesomeIcon icon={faBars} />
                                </button>

                                <div className="brand">
                                    <h3>NINU</h3>
                                    <h6 className="text-body-secondary">
                                        university system
                                    </h6>
                                </div>
                            </div>

                            <div className="middle-part d-none d-sm-block text-center">
                                <div className="name fw-bold">
                                    <p className="mb-0">ahmed elshahat</p>
                                </div>
                                <div className="mail">
                                    <p className="mb-0 text-black-50">
                                        ahmedelshahat@gmail.com
                                    </p>
                                </div>
                            </div>

                            <div className="right-part d-flex gap-2">
                                <ul className="navbar-nav ms-auto d-flex flex-row">
                                    <li className="nav-item dropdown">
                                        <a
                                            className="nav-link dropdown-toggle hidden-arrow d-flex align-items-center"
                                            href="#"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <img
                                                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp"
                                                className="rounded-circle"
                                                height="40"
                                                alt="Avatar"
                                                loading="lazy"
                                            />
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu-end">
                                            <li>
                                                <Button
                                                    className="dropdown-item"
                                                    variant="primary"
                                                    onClick={handleShowModal}
                                                >
                                                    Change Password
                                                </Button>
                                            </li>
                                            <li>
                                                <a
                                                    className="dropdown-item"
                                                    href="#"
                                                >
                                                    Settings
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    className="dropdown-item"
                                                    href="#"
                                                    onClick={handleLogout}
                                                >
                                                    Logout
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>

                {/* Sidebar */}
                <nav
                    id="sidebarMenu"
                    className={`collapse d-lg-block sidebar collapse bg-white shadow-sm ${
                        sidebarOpen ? "show" : ""
                    }`}
                >
                    <div className="position-sticky">
                        <div className="list-group list-group-flush rounded mx-3 mt-4">
                            <a
                                href="#student"
                                className="list-group-item list-group-item-action py-2 ripple active"
                                aria-current="true"
                            >
                                <FontAwesomeIcon
                                    icon={faUser}
                                    className="me-2"
                                />
                                <span className="ms-2">Student Data</span>
                            </a>
                            <a
                                href="#examsTable"
                                className="list-group-item list-group-item-action py-2 ripple"
                            >
                                <FontAwesomeIcon
                                    icon={faTableList}
                                    className="me-2"
                                />
                                <span className="ms-2">Exams Table</span>
                            </a>
                            <a
                                href="#survey"
                                className="list-group-item list-group-item-action py-2 ripple"
                            >
                                <FontAwesomeIcon
                                    icon={faSquarePollVertical}
                                    className="me-2"
                                />
                                <span className="ms-2">Survey</span>
                            </a>
                            <a
                                href="#result"
                                className="list-group-item list-group-item-action py-2 ripple"
                            >
                                <FontAwesomeIcon
                                    icon={faRankingStar}
                                    className="me-2"
                                />
                                <span className="ms-2">Result</span>
                            </a>
                            <a
                                href="#warning"
                                className="list-group-item list-group-item-action py-2 ripple"
                            >
                                <FontAwesomeIcon
                                    icon={faTriangleExclamation}
                                    className="me-2"
                                />
                                <span className="ms-2">Warning</span>
                            </a>
                            <a
                                href="#wallet"
                                className="list-group-item list-group-item-action py-2 ripple"
                            >
                                <FontAwesomeIcon
                                    icon={faWallet}
                                    className="me-2"
                                />
                                <span className="ms-2">Wallet</span>
                            </a>
                            <a
                                href="#cash"
                                className="list-group-item list-group-item-action py-2 ripple"
                            >
                                <FontAwesomeIcon
                                    icon={faMoneyBill}
                                    className="me-2"
                                />
                                <span className="ms-2">Cash</span>
                            </a>
                            <a
                                href="#settings"
                                className="list-group-item list-group-item-action py-2 ripple"
                            >
                                <FontAwesomeIcon
                                    icon={faGear}
                                    className="me-2"
                                />
                                <span className="ms-2">Settings</span>
                            </a>
                        </div>
                    </div>
                </nav>
            </header>
            <main className="mt-5">
                <div className="container pt-5">
                    <div className="main-page h-100">
                        <div className="page student-page p-3" id="student">
                            <div className="student-main-info border shadow-sm bg-white rounded-3 px-3 py-3 row">
                                <div className="student-faculity d-flex align-items-center col px-0">
                                    <h6 className="mb-0">
                                        faculity of{" "}
                                        <span className="fw-bold text-primary">
                                            nursing
                                        </span>
                                    </h6>
                                </div>
                                <div className="student-grade d-flex align-items-center justify-content-center col px-0">
                                    <h6 className="mb-0">
                                        grade{" "}
                                        <span className="fw-bold text-primary">
                                            2
                                        </span>
                                    </h6>
                                </div>
                                <div className="student-total-gpa d-flex align-items-center justify-content-end col px-0">
                                    <h6 className="mb-0">
                                        total GPA{" "}
                                        <span className="fw-bold text-primary">
                                            3.18
                                        </span>
                                    </h6>
                                </div>
                            </div>
                            <div className="student-secondary-info mt-3">
                                {userData && (
                                    <div className="row">
                                        <h2>
                                            Welcome,{" "}
                                            {userData.userData?.fullName}
                                        </h2>
                                        {renderUserData(
                                            "User Data",
                                            userData.userData
                                        )}
                                        {renderUserData(
                                            "User Family Data",
                                            userData.userFamilyData
                                        )}
                                        {renderUserData(
                                            "User Contact Data",
                                            userData.userContactData
                                        )}
                                        {renderUserData(
                                            "User Previous Qualification Data",
                                            userData.userPreviousQualificationData
                                        )}
                                        {renderUserData(
                                            "In The Event Of Transferring To Another College Or Institute",
                                            userData.InTheEventOfTransferringToAnotherCollegeOrInstitute
                                        )}
                                        {renderUserData(
                                            "The Specialty He Wishes To Join",
                                            userData.TheSpecialtyHeWishesToJoin
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="page exams-page d-none" id="exams">
                            <h4>exams</h4>
                        </div>
                        <div className="page survey-page d-none" id="survey">
                            <h4>survey</h4>
                        </div>
                        <div className="page result-page d-none" id="result">
                            <h4>result</h4>
                        </div>
                        <div className="page warning-page d-none" id="warning">
                            <h4>warning</h4>
                        </div>
                        <div className="page wallet-page d-none" id="wallet">
                            <h4>wallet</h4>
                        </div>
                        <div className="page cash-page d-none" id="cash">
                            <h4>cash</h4>
                        </div>
                        <div
                            className="page settings-page d-none"
                            id="settings"
                        >
                            <h4>settings</h4>
                        </div>
                    </div>
                </div>
            </main>
            {/* Change Password Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Change Password Form */}
                    <Form>
                        <Form.Group controlId="oldPassword">
                            <Form.Label>Old Password</Form.Label>
                            <div className="input-group">
                                <Form.Control
                                    type={showOldPassword ? "text" : "password"}
                                    value={oldPassword}
                                    onChange={(e) =>
                                        setOldPassword(e.target.value)
                                    }
                                    required
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary outline-left-0"
                                    onClick={toggleOldPasswordVisibility}
                                >
                                    {showOldPassword ? (
                                        <FaEyeSlash />
                                    ) : (
                                        <FaEye />
                                    )}
                                </button>
                            </div>
                        </Form.Group>
                        <Form.Group controlId="newPassword">
                            <Form.Label>New Password</Form.Label>
                            <div className="input-group">
                                <Form.Control
                                    type={showNewPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                    required
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={toggleNewPasswordVisibility}
                                >
                                    {showNewPassword ? (
                                        <FaEyeSlash />
                                    ) : (
                                        <FaEye />
                                    )}
                                </button>
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleChangePassword}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default User;
