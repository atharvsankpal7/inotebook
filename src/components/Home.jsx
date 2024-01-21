import "../App.css";
import NoteContext from "../context/notes/NoteContext";
import React, { useContext, useState } from "react";
import Note from "./Note";
const Home = () => {
    const noteContext = useContext(NoteContext);

    // Destructuring
    const { notes, setNote } = noteContext;

    const [selectedImage, setSelectedImage] = useState(null);

    const handleInputImageChange = (e) => {
        let newImage = e.target.files[0];
        setSelectedImage(newImage);
    };

    const uploadImage = () => {};
    return (
        <div className=" pt-3 pb-3 ">
            <h2 className="text-center pt-3">Welcome back, Username!!!</h2>
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
            <h3 className="text-center pt-3"> Welcome back, Username !!!</h3>
            <div className="container note-container text-xxl-center">
                {notes.map((note) => {
                    return (
                        <Note
                            key={note._id}
                            baseImage={note.baseImage}
                            description={note.description}
                            image={note.image}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Home;
