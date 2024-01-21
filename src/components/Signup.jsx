import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const YourComponent = () => {
    const url = "http://localhost:5000/api/";
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // Perform client-side validation
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length !== 0) {
            setErrors(validationErrors);
            return;
        }

        // Contacting the backend
        try {
            const response = await fetch(`${url}auth/createuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.password,
                    email: formData.email,
                    password: formData.password,
                }),
            });
            const data = await response.json();
            // If response does not have auth token
            if (!data.authToken) {
                console.log("user already exist");
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

        if (!data.username.trim()) {
            errors.username = "Username is required";
        }

        if (!data.email.trim()) {
            errors.email = "Email is required";
        } else if (!isValidEmail(data.email)) {
            errors.email = "Invalid email address";
        }

        if (!data.password.trim()) {
            errors.password = "Password is required";
        } else if (data.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        return errors;
    };

    const isValidEmail = (email) => {
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
        <form onSubmit={handleFormSubmit}>
            <div className="container-fluid p-4">
                <div className="row">
                    <div className="col-md-6 text-center text-md-start d-flex flex-column justify-content-center">
                        <h1 className="my-5 display-3 fw-bold ls-tight px-3">
                            The best offer <br />
                            <span className="text-primary">
                                for your business
                            </span>
                        </h1>

                        <p
                            className="px-3"
                            style={{ color: "hsl(217, 10%, 50.8%)" }}
                        >
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Eveniet, itaque accusantium odio, soluta,
                            corrupti aliquam quibusdam tempora at cupiditate
                            quis eum maiores libero veritatis? Dicta facilis
                            sint aliquid ipsum atque?
                        </p>
                    </div>

                    <div className="col-md-6">
                        <div className="card my-5">
                            <div className="card-body p-5">
                                <div className="mb-4">
                                    <label
                                        htmlFor="username"
                                        className="form-label"
                                    >
                                        User name
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control ${
                                            errors.username ? "is-invalid" : ""
                                        }`}
                                        id="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                    {errors.username && (
                                        <div className="invalid-feedback">
                                            {errors.username}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="email"
                                        className="form-label"
                                    >
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
                                    <label
                                        htmlFor="password"
                                        className="form-label"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className={`form-control ${
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

                                <button
                                    className="w-100 mb-4 btn btn-primary"
                                    type="submit"
                                >
                                    Sign up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default YourComponent;
