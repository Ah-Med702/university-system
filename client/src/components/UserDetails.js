import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./styles/EditButton.css";
import "./styles/SaveButton.css";
import axios from "axios";
import Swal from "sweetalert2";

const UserDetails = () => {
    const { id } = useParams();
    const [userData, setUserData] = useState({});
    const [editableField, setEditableField] = useState(null);
    const inputRef = useRef(null);

    const API = process.env.API;

    useEffect(() => {
        document.title = "User details";
    }, []);

    const handleEdit = (section, fieldName) => {
        setEditableField({ section, fieldName });
    };

    useEffect(() => {
        if (editableField) {
            inputRef.current.focus();
        }
    }, [editableField]);

    const handleInputChange = (event) => {
        const { value } = event.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [editableField.section]: {
                ...prevUserData[editableField.section],
                [editableField.fieldName]: value,
            },
        }));
    };

    const handleSave = async (section, fieldName) => {
        // Show processing message
        Swal.fire({
            title: "Processing...",
            didOpen: () => {
                Swal.showLoading();
            },
        });

        const updatedData = {
            [section]: {
                [fieldName]: userData[section][fieldName],
            },
        };

        try {
            // Merge the updated field with the existing userData
            const updatedUserData = { ...userData, ...updatedData };

            await axios.put(`${API}/userDetails/${id}`, updatedUserData);
            // Show success message
            Swal.fire({
                icon: "success",
                title: "Data updated successfully!",
                showConfirmButton: false,
                timer: 1500,
            });
            // Clear editableField after saving
            setEditableField(null);
        } catch (error) {
            // Show error message
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong! Please try again.",
            });
            console.error("Error updating user details:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API}/userDetails/${id}`);
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <div className="p-3">
            <h2 className="mb-4 fw-bold text-uppercase">User Details</h2>
            {Object.entries(userData)
                .filter(([section]) => section !== "_id" && section !== "__v")
                .map(([section, fields]) => (
                    <fieldset key={section} className="mb-4">
                        <legend className="fw-bold text-uppercase w-100">
                            {section}
                        </legend>
                        <div className="row">
                            {Object.entries(fields).map(
                                ([fieldName, fieldValue]) => (
                                    <div
                                        key={fieldName}
                                        className="mb-3 col-12 col-sm-6 col-md-4 col-lg-3"
                                    >
                                        <label className="form-label">
                                            {fieldName
                                                .replace(
                                                    /([a-z])([A-Z])/g,
                                                    "$1 $2"
                                                )
                                                .toLowerCase()}
                                            :
                                        </label>
                                        <div className="d-flex gap-2">
                                            {fieldName === "role" ? (
                                                <span className="form-control bg-body-secondary">
                                                    {fieldValue}
                                                </span>
                                            ) : editableField &&
                                              editableField.section ===
                                                  section &&
                                              editableField.fieldName ===
                                                  fieldName ? (
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name={fieldName}
                                                    value={fieldValue}
                                                    onChange={handleInputChange}
                                                    ref={inputRef}
                                                />
                                            ) : (
                                                <span className="form-control">
                                                    {fieldValue}
                                                </span>
                                            )}
                                            {/* Show edit button when admin hovers over the field */}
                                            {fieldName !== "role" &&
                                            (!editableField ||
                                                editableField.section !==
                                                    section ||
                                                editableField.fieldName !==
                                                    fieldName) ? (
                                                <button
                                                    onClick={() =>
                                                        handleEdit(
                                                            section,
                                                            fieldName
                                                        )
                                                    }
                                                    className="btn btn-outline-primary edit-button"
                                                >
                                                    Edit
                                                </button>
                                            ) : (
                                                fieldName !== "role" && (
                                                    <button
                                                        onClick={() =>
                                                            handleSave(
                                                                section,
                                                                fieldName
                                                            )
                                                        }
                                                        className="btn btn-outline-primary save-button"
                                                    >
                                                        Save
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </fieldset>
                ))}
        </div>
    );
};

export default UserDetails;
