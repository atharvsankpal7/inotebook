import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
const Navbar = () => {
    let location = useLocation();
    useEffect(() => {}, [location]);

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    Company
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item ">
                            <Link
                                className={`nav-link ${
                                    location.pathname === "/" ? "active text-info" : ""
                                }`}
                                aria-current="page"
                                to="/"
                            >
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${
                                    location.pathname === "/about"
                                        ? " active text-info"
                                        : ""
                                }`}
                                to="/about"
                            >
                                About
                            </Link>
                        </li>
                    </ul>
                    <form className="d-flex gap-2">
                        <button
                            className="btn btn-outline-light "
                            type="submit"
                        >
                            Sign-up
                        </button>
                        <button className="btn btn-info " type="submit">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
