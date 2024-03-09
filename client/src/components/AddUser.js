import "./styles/Blur.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddUser = () => {
    const API = "https://bondok-university-system-server.vercel.app";
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

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
        }
    }, [navigate]);

    useEffect(() => {
        document.title = "Add user";
    }, []);

    const [userDataForm, setUserDataForm] = useState({
        userRegistration: {
            username: "",
            password: "",
            role: "user",
        },
        userData: {
            fullName: "",
            code: "",
            nationality: "",
            gender: "",
            religion: "",
            birthdate: "",
            nationalID: "",
            PlaceOfBirth: "",
            ReleaseDate: "",
            PlaceOfRelease: "",
        },
        userFamilyData: {
            GuardianName: "",
            job: "",
            city: "",
            address: "",
            homeTelephone: "",
            mobile: "",
            email: "",
            fax: "",
        },
        userContactData: {
            city: "",
            address: "",
            homeTelephone: "",
            mobile: "",
            email: "",
            fax: "",
            mailBox: "",
            systemMail: "",
        },
        userPreviousQualificationData: {
            school: "",
            qualification: "",
            GraduationYear: "",
            TheRoleOfTheQualification: "",
            TotalScores: "",
            ratio: "",
            sittingNumber: "",
            CoordinationApprovalNumber: "",
            CoordinationApprovalDate: "",
        },
        InTheEventOfTransferringToAnotherCollegeOrInstitute: {
            ThePartyFromWhichItIsTransferred: "",
            YearOfEnrollment: "",
        },
        TheSpecialtyHeWishesToJoin: {
            Desires: "",
        },
    });

    const handleInputChange = (event, section) => {
        const { name, value } = event.target;
        setUserDataForm((prevUserDataForm) => ({
            ...prevUserDataForm,
            [section]: {
                ...prevUserDataForm[section],
                [name]: value,
            },
        }));
    };

    const handleDateChange = (date, section) => {
        setUserDataForm((prevFormData) => ({
            ...prevFormData,
            [section]: {
                ...prevFormData[section],
                birthdate:
                    date instanceof Date && !isNaN(date)
                        ? date.toISOString()
                        : "", // Ensure date is valid
            },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios
            .post(`${API}/admin/addUser`, userDataForm)
            .then((result) => {
                if (result.data === "User already exists") {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Username already exists. Please try again.",
                    });
                } else {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "New User Added Successfully.",
                        willClose: () => {
                            navigate("/admin");
                        },
                    });
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong. Please try again later.",
                });
            });
    };

    const handleCancel = () => {
        navigate("/admin");
    };

    return (
        <div className="add-user-page">
            <div className={isModalOpen ? "blur-container" : ""}>
                <div className="p-3">
                    <div className="d-flex align-items-center justify-content-between">
                        <h2 className="mb-4 fw-bold text-uppercase">
                            add user
                        </h2>
                        <button
                            type="button"
                            className="btn btn-outline-danger mb-4"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        {Object.entries(userDataForm).map(
                            ([section, fields]) => (
                                <fieldset key={section} className="mb-4 row">
                                    <legend className="mb-3 fw-medium">
                                        {section
                                            .replace(/([a-z])([A-Z])/g, "$1 $2")
                                            .toLowerCase()}
                                    </legend>
                                    {Object.entries(fields).map(
                                        ([fieldName, fieldValue]) => (
                                            <div
                                                key={fieldName}
                                                className="mb-3 col-12 col-sm-6 col-md-4 col-lg-3 d-flex flex-column"
                                            >
                                                <label
                                                    htmlFor={fieldName}
                                                    className="form-label"
                                                >
                                                    {fieldName
                                                        .replace(
                                                            /([a-z])([A-Z])/g,
                                                            "$1 $2"
                                                        )
                                                        .toLowerCase()}
                                                    :
                                                </label>
                                                {/* Render select dropdowns for religion and gender */}
                                                {(fieldName === "birthdate" && (
                                                    <DatePicker
                                                        selected={
                                                            fieldValue
                                                                ? new Date(
                                                                      fieldValue
                                                                  )
                                                                : null
                                                        }
                                                        onChange={(date) =>
                                                            handleDateChange(
                                                                date,
                                                                section
                                                            )
                                                        }
                                                        dateFormat="yyy-MM-dd"
                                                        className="form-control"
                                                    />
                                                )) ||
                                                    (fieldName ===
                                                        "religion" && (
                                                        <select
                                                            name={fieldName}
                                                            value={fieldValue}
                                                            onChange={(event) =>
                                                                handleInputChange(
                                                                    event,
                                                                    section
                                                                )
                                                            }
                                                            className="form-select"
                                                        >
                                                            <option value="">
                                                                Select Religion
                                                            </option>
                                                            <option value="Islam">
                                                                Islam
                                                            </option>
                                                            <option value="Christianity">
                                                                Christianity
                                                            </option>
                                                        </select>
                                                    )) ||
                                                    (fieldName === "gender" && (
                                                        <select
                                                            name={fieldName}
                                                            value={fieldValue}
                                                            onChange={(event) =>
                                                                handleInputChange(
                                                                    event,
                                                                    section
                                                                )
                                                            }
                                                            className="form-select"
                                                        >
                                                            <option value="">
                                                                Select Gender
                                                            </option>
                                                            <option value="Male">
                                                                Male
                                                            </option>
                                                            <option value="Female">
                                                                Female
                                                            </option>
                                                        </select>
                                                    )) ||
                                                    (fieldName === "role" && (
                                                        <input
                                                            type="text"
                                                            name={fieldName}
                                                            value={fieldValue}
                                                            disabled
                                                            className="form-control"
                                                        />
                                                    )) || (
                                                        <input
                                                            type="text"
                                                            name={fieldName}
                                                            value={fieldValue}
                                                            onChange={(event) =>
                                                                handleInputChange(
                                                                    event,
                                                                    section
                                                                )
                                                            }
                                                            required={
                                                                fieldName ===
                                                                    "username" ||
                                                                fieldName ===
                                                                    "password" ||
                                                                fieldName ===
                                                                    "fullName" ||
                                                                fieldName ===
                                                                    "code" ||
                                                                fieldName ===
                                                                    "nationality" ||
                                                                fieldName ===
                                                                    "gender" ||
                                                                fieldName ===
                                                                    "religion" ||
                                                                fieldName ===
                                                                    "birthdate" ||
                                                                fieldName ===
                                                                    "nationalID" ||
                                                                fieldName ===
                                                                    "PlaceOfBirth" ||
                                                                (section ===
                                                                    "userContactData" &&
                                                                    (fieldName ===
                                                                        "city" ||
                                                                        fieldName ===
                                                                            "address" ||
                                                                        fieldName ===
                                                                            "mobile" ||
                                                                        fieldName ===
                                                                            "systemMail")) ||
                                                                fieldName ===
                                                                    "qualification" ||
                                                                fieldName ===
                                                                    "TotalScores"
                                                            }
                                                            className="form-control"
                                                        />
                                                    )}
                                            </div>
                                        )
                                    )}
                                </fieldset>
                            )
                        )}
                        <div className="w-100 d-flex justify-content-center">
                            <button
                                type="submit"
                                className="btn btn-primary mb-4"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddUser;
