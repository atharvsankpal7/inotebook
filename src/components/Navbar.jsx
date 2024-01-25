import React from "react";
import { Link, useLocation } from "react-router-dom";
const Navbar = () => {
    let location = useLocation();
    const handleLogOutClick = () => {
        localStorage.removeItem("token");
        location("/login");
    };
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary ">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/about">
                    Company
                </Link>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item ">
                            <Link
                                className={`nav-link ${
                                    location.pathname === "/"
                                        ? "active text-info"
                                        : ""
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
                        {localStorage.getItem("token") ? (
                            <li className="nav-item">
                                <Link
                                    className={`nav-link ${
                                        location.pathname === "/chatbot"
                                            ? " active text-info"
                                            : "text-warning "
                                    }`}
                                    to="/chatbot"
                                >
                                    ChatBot
                                </Link>
                            </li>
                        ) : (
                            <></>
                        )}
                    </ul>
                    {!localStorage.getItem("token") ? (
                        <form className="d-flex gap-2">
                            <Link
                                className=" w-100 h-100 btn btn-outline-light "
                                to="/signup"
                            >
                                Sign-Up
                            </Link>
                            <Link className=" btn btn-info " to="/login">
                                Login
                            </Link>
                        </form>
                    ) : (
                        <form>
                            <Link
                                className="w-100 h-100 btn btn-danger"
                                onClick={handleLogOutClick}
                            >
                                Log Out
                            </Link>
                        </form>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
