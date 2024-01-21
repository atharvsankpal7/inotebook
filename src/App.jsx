import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Signup from "./components/Signup";
import NoteState from "./context/notes/NoteState";
import Login from "./components/Login";
const App = () => {
    return (
        <>
            <NoteState>
                <Router>
                    <Navbar />
                    <div className="container">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="signup" element={<Signup />} />
                            <Route path="login" element={<Login />} />
                            <Route
                                path="emptyPath"
                                element={<NoteState />}
                            ></Route>
                        </Routes>
                    </div>
                </Router>
            </NoteState>
        </>
    );
};

export default App;
