import "./styles/User.css";
import "./styles/Blur.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const User = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const [userData, setUserData] = useState({});

    useEffect(() => {
        document.title = "User Page";
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3001/user/${id}`
                );
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        const userData = sessionStorage.getItem("userData");
        if (!userData) {
            Swal.fire({
                icon: "warning",
                title: "Please login first",
                text: "You need to login to access the admin page",
                didClose: () => {
                    setIsModalOpen(false);
                    navigate("/login");
                },
            });
            setIsModalOpen(true);
        }
    }, [navigate]);

    const logout = () => {
        sessionStorage.removeItem("userData");
        navigate("/login");
    };

    const renderUserData = (sectionTitle, sectionData) => {
        return (
            <div>
                <h3>{sectionTitle}</h3>
                <ul className="row ps-0">
                    {sectionData &&
                        Object.entries(sectionData).map(([key, value]) => (
                            <li
                                key={key}
                                className="mb-3 col-12 col-md-6 list-group-item px-2"
                            >
                                <div className="bg-body-secondary p-2">
                                    <strong>{key}: </strong>
                                    {value}
                                </div>
                            </li>
                        ))}
                </ul>
            </div>
        );
    };

    return (
        <div className={isModalOpen ? "blur-container" : ""}>
            <div className="side-nav bg-primary-subtle h-100 position-fixed py-2 pe-2 d-flex flex-column justify-content-between">
                <div className="system-info bg-white p-3 d-flex flex-column gap-2 rounded-end">
                    <h3> NINU</h3>
                    <h6 className="text-body-secondary">
                        bondok university system
                    </h6>
                </div>
                <div className="user-profile py-2 px-3 d-flex flex-column gap-1">
                    <div className="img bg-body-tertiary rounded-pill d-flex align-items-center justify-content-center">
                        <i className="fa fa-user fa-2x" />
                    </div>
                    <div className="name fw-bold">
                        <p>ahmed elshahat</p>
                    </div>
                    <div className="mail">
                        <p>ahmedelshahat@gmail.com</p>
                    </div>
                </div>
                <div className="lis nav bg-white py-2 px-2 d-flex flex-column gap-2 rounded-end">
                    <a
                        className="nav-link px-2 py-1 active"
                        href="#student"
                        id="student"
                    >
                        <li>student data</li>
                    </a>
                    <a className="nav-link px-2 py-1" href="#exams" id="exams">
                        <li>exams table</li>
                    </a>
                    <a
                        className="nav-link px-2 py-1"
                        href="#survey"
                        id="survey"
                    >
                        <li>survey</li>
                    </a>
                    <a
                        className="nav-link px-2 py-1"
                        href="#result"
                        id="result"
                    >
                        <li>result</li>
                    </a>
                    <a
                        className="nav-link px-2 py-1"
                        href="#warning"
                        id="warning"
                    >
                        <li>warning</li>
                    </a>
                    <a
                        className="nav-link px-2 py-1"
                        href="#wallet"
                        id="wallet"
                    >
                        <li>wallet</li>
                    </a>
                    <a className="nav-link px-2 py-1" href="#cash" id="cash">
                        <li>cash</li>
                    </a>
                    <a
                        className="nav-link px-2 py-1"
                        href="#settings"
                        id="settings"
                    >
                        <li>settings</li>
                    </a>
                </div>
            </div>
            <div className="main-page h-100 ">
                <nav className="navbar navbar-expand-lg navbar-light w-100 bg-light">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <button
                                className="nav-link btn btn-link"
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </nav>
                <div className="page student-page p-3" id="student">
                    <div className="student-main-info w-100 bg-primary-subtle rounded-3 px-3 py-2 d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-3">
                            <div className="student-img bg-body-secondary d-flex align-items-center justify-content-center rounded-pill">
                                <i className="fa fa-user fa-1x" />
                            </div>
                            <div className="student-name">
                                <h6>ahmed elshahat</h6>
                            </div>
                        </div>
                        <div className="student-faculity">
                            <h6>faculity of nursing</h6>
                        </div>
                        <div className="student-grade">
                            <h6>grade 2</h6>
                        </div>
                        <div className="student-total-gpa">
                            <h6>total GPA = 3.18</h6>
                        </div>
                    </div>
                    <div className="student-secondary-info mt-3">
                        {/* <p className="bg-warning-subtle p-2 rounded">
                            name / ahmed elshahat bayoumy abdelmegeid
                        </p>
                        <p className="bg-warning-subtle p-2 rounded">
                            age / 19
                        </p>
                        <p className="bg-warning-subtle p-2 rounded">
                            birthday / 20/6/2004
                        </p>
                        <p className="bg-warning-subtle p-2 rounded">
                            year of inter / 2022
                        </p>
                        <p className="bg-warning-subtle p-2 rounded">
                            magmo3 el thanawiya / 311
                        </p> */}
                        {userData && (
                            <div>
                                <h2>Welcome, {userData.userData?.fullName}</h2>
                                {renderUserData("User Data", userData.userData)}
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
                <div className="page settings-page d-none" id="settings">
                    <h4>settings</h4>
                </div>
            </div>
        </div>
    );
};

export default User;
