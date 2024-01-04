import React from "react";
import "../App.css";
const Home = () => {
    return (
        <>
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
                        />
                        <label
                            htmlFor="image_upload"
                            className="w-100 h-100 d-flex align-items-center justify-content-center"
                        >
                            <span>Browse Images</span>
                        </label>
                    </div>
                    <button className="btn btn-light w-100 my-3  ">
                        Upload Image
                    </button>{" "}
                </div>
            </div>
        </>
    );
};

export default Home;
