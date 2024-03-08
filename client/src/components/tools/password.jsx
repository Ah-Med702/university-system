import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const PasswordInput = ({ value, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="input-group">
            <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="form-control"
                id="password"
                value={value}
                onChange={onChange}
                required
            />
            <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={togglePasswordVisibility}
            >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
        </div>
    );
};

export default PasswordInput;
