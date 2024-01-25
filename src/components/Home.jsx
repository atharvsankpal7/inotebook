import "../App.css";
import NoteContext from "../context/notes/NoteContext";
import React, { useContext, useEffect, useState } from "react";
import Note from "./Note";
import AlertDismissibleExample from "./Alert";
import { useNavigate } from "react-router-dom";
const Home = () => {
    const noteContext = useContext(NoteContext);

    const url = "http://localhost:5000/api/";

    // Destructuring
    const { notes, setNotes } = noteContext;
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUploadStatus, setImageUploadStatus] = useState({
        userTried: false,
        isUploaded: false,
        imageString: null,
    });

    const handleInputImageChange = (e) => {
        let newImage = e.target.files[0];
        setSelectedImage(newImage);
        // Create a new FileReader to read the selected image
        const reader = new FileReader();

        // Set up the onload event handler for the FileReader
        reader.onload = function(event) {
            // Create a new Image object
            const image = new Image();

            // Set up the onload event handler for the Image
            image.onload = function() {
                // Now that the image has loaded, you can access its dimensions

                // Create a canvas element
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                // Set the canvas dimensions to match the image
                canvas.width = image.width;
                canvas.height = image.height;

                // Draw the image onto the canvas
                ctx.drawImage(image, 0, 0);

                // Get the base64-encoded data URL
                const base64String = canvas.toDataURL("image/jpeg");

                setImageUploadStatus({ imageString: base64String });
            };

            // Set the source of the Image to the data URL obtained from FileReader
            image.src = event.target.result;
        };

        // Read the selected image as a data URL using FileReader
        reader.readAsDataURL(newImage);
    };
    
    // if not logged in then navigate to the login page
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            navigate("/login");
            return;
        }

        getNotes();
    }, []);

    let getNotes = async () => {
        try {
            const response = await fetch(`${url}notes/getallnotes`, {
                method: "GET",
                headers: {
                    "auth-token": localStorage.getItem("token"),
                },
            });

            // Check if the response is ok
            if (!response.ok) {
                return;
            }

            // Parse the JSON data from the response
            const data = await response.json();

            setNotes(data);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    const uploadImage = async () => {
        setImageUploadStatus({ userTried: false, isUploaded: false });

        try {
            const response = await fetch(`${url}notes/addnote`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    baseImage: imageUploadStatus.imageString,
                }),
            });

            // Check if the response is ok
            if (!response.ok) {
                setImageUploadStatus({ userTried: true, isUploaded: false });
                return;
            }
            // Updating notes
            setImageUploadStatus({ userTried: true, isUploaded: true });
            const data = await response.json();
            const currentNotes = notes;
            currentNotes.push(data);
            setNotes(currentNotes);
            getNotes();
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };
    return (
        <div className=" pt-3 pb-3 ">
            {imageUploadStatus.userTried ? (
                imageUploadStatus.isUploaded ? (
                    <AlertDismissibleExample
                        type="success"
                        message="Image Uploaded successfully"
                    ></AlertDismissibleExample>
                ) : (
                    <AlertDismissibleExample
                        type="danger"
                        message="Error Uploading Image"
                    ></AlertDismissibleExample>
                )
            ) : (
                <></>
            )}
            <h2 className="text-center pt-3">
                {" "}
                Welcome back,{" "}
                {localStorage.getItem("username")
                    ? localStorage.getItem("username")
                    : "username"}{" "}
                !!!
            </h2>
            <div className="container d-flex justify-content-center text-xxl-center">
                <div className="image-upload-container ">
                    <div className="img ">
                        <input
                            type="file"
                            accept="image/*"
                            name=""
                            id="image_upload"
                            hidden
                            onChange={handleInputImageChange}
                            onClick={() => {
                                setImageUploadStatus({
                                    userTried: false,
                                    isUploaded: false,
                                });
                            }}
                        />

                        <label
                            htmlFor="image_upload"
                            className="w-100 h-100 d-flex align-items-center justify-content-center"
                        >
                            {selectedImage ? (
                                <img
                                    src={URL.createObjectURL(selectedImage)}
                                    alt="Selected Image"
                                    className=" w-100 h-100"
                                />
                            ) : (
                                <span>image</span>
                            )}
                        </label>
                    </div>
                    <button
                        className="btn btn-light w-100 my-3  "
                        onClick={uploadImage}
                    >
                        Upload Image
                    </button>{" "}
                </div>
            </div>
            <h3 className="text-center pt-3">
                {"  "}
                Welcome back,{" "}
                {localStorage.getItem("username")
                    ? localStorage.getItem("username")
                    : "username"}{" "}
                !!!
            </h3>
            {Array.isArray(notes) ? (
                <div className="container note-container text-xxl-center">
                    {notes.map((note) => (
                        <Note
                            key={note._id}
                            baseImage={note.baseImage}
                            description={note.description}
                            image={note.baseImage}
                        />
                    ))}
                </div>
            ) : (
                <AlertDismissibleExample
                    type="danger"
                    message="Error Loading Previous Results"
                ></AlertDismissibleExample>
            )}
        </div>
    );
};

export default Home;
