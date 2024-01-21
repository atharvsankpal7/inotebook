import NoteContext from "./NoteContext";
import { useState, useEffect } from "react";
import { redirect } from "react-router-dom";

const NoteState = (props) => {
    const url = "http://localhost:5000/api/";

    const [notes, setNotes] = useState([]);
    const navigate = redirect();
    const getNotes = async () => {
        console.log("hello");
        try {
            const response = await fetch(`${url}notes/getallnotes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
            });

            // Check if the response is ok
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Parse the JSON data from the response
            const data = await response.json();
            setNotes(data);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
            return;
        }
        getNotes();
    }, [localStorage.getItem("token")]);

    return (
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
