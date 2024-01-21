import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
    const url = "http://localhost:5000/api/";
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleLoginClick = async (e) => {
        e.preventDefault();
        // Performing client-side validation
        const validationErrors = validateForm(formData);
        // checking for validation errors
        if (Object.keys(validationErrors).length !== 0) {
            setErrors(validationErrors);
            console.log(Object.keys(validationErrors));
            return;
        }
        // Contacting the backend
        try {
            const response = await fetch(`${url}auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });
            const data = await response.json();
            // If response does not have auth token
            if (!response.ok) {
                console.log("Invalid Credientials");
                return;
            }
            localStorage.setItem("token", data.authToken);
            navigate("/");
        } catch (error) {
            console.error("Error during login request:", error);
        }
    };

    const validateForm = (data) => {
        let errors = {};

        if (!data.email.trim()) {
            errors.email = "Email is required";
        } else if (!isValidEmail(data.email)) {
            errors.email = "Invalid email address";
        }

        if (!data.password.trim()) {
            errors.password = "Password is required";
        }

        return errors;
    };

    const isValidEmail = (email) => {
        // Basic email validation, you can use a more sophisticated method if needed
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });

        // Clear the corresponding error when user types
        setErrors({
            ...errors,
            [e.target.id]: "",
        });
    };

    return (
        <div className="container-fluid p-3 my-5 h-custom">
            <div className="row">
                <div className="col-10 col-md-6">
                    <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                        className="img-fluid"
                        alt="Sample image"
                    />
                </div>
                <form
                    onSubmit={handleLoginClick}
                    className="col-4 col-md-6 my-lg-5 my-md-3 py-md-3 py-lg-5 my-sm-5"
                >
                    <div className="mb-4">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className={`form-control ${
                                errors.email ? "is-invalid" : ""
                            }`}
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && (
                            <div className="invalid-feedback">
                                {errors.email}
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className={`form-control form-control-lg ${
                                errors.password ? "is-invalid" : ""
                            }`}
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && (
                            <div className="invalid-feedback">
                                {errors.password}
                            </div>
                        )}
                    </div>

                    <div className="text-center text-md-start mt-4 pt-2">
                        <button
                            className="mb-0 px-5 btn btn-info"
                            type="submit"
                        >
                            Login
                        </button>
                        <p className="small fw-bold mt-2 pt-1 mb-2">
                            Don't have an account?{" "}
                            <Link to="/signup" className="link link-info">
                                Register
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
