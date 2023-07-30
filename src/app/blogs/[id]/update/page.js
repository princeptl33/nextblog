"use client";
import React, { useState } from "react";
import "./index.css";

import { useRouter } from "next/navigation";

const Page = ({params}) => {
  const router = useRouter();

  const id = params.id;

  const CLOUD_NAME = "dxs2oztts";
  const UPLOAD_PRESET = "my_project_blog";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !photo) {
      console.log("filled all detils");
    }

    try {
      const imageUrl = await UploadImage();

      const res = await fetch(`http://localhost:3000/api/blog/${id}/updateblog`, {
        headers: {
          "content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({ title, description, image: imageUrl, author }),
      });

      const data = await res.json();
      if (!data) return console.log("error in creating");
      router.push(`/blogs/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const UploadImage = async () => {
    if (!photo) return;

    const formData = new FormData();

    formData.append("file", photo);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const data = await res.json();

      const imageUrl = data["secure_url"];

      return imageUrl;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <form onSubmit={handleSubmit}>
      <input type="text" placeholder='title' onChange={(e)=> setTitle(e.target.value)}  />
      <input type="text" placeholder='description' onChange={(e)=> setDescription(e.target.value)}  />
      <input type="file" placeholder='image' onChange={(e)=> setPhoto(e.target.files[0])}  />
      <button>create</button>
      </form> */}

      <div>
        <div className="contact-form-wrapper d-flex justify-content-center">
          <form className="contact-form" onSubmit={handleSubmit}>
            <h5 className="title">Update Blog</h5>
            <p className="description">
              A Blog is only as intersting as the interest in other.
            </p>
            <div>
              <input
                type="text"
                className="form-control rounded border-white mb-3 form-input"
                id="title"
                placeholder="title"
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <textarea
                id="message"
                className="form-control rounded border-white mb-3 form-text-area"
                rows="5"
                cols="30"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div>
              <input
                type="text"
                className="form-control rounded border-white mb-3 form-input"
                id="title"
                placeholder="Author"
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </div>
            <div
              style={{
                marginLeft: "20px",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              <label htmlFor="image">
                <i className="fa-solid fa-file" style={{ cursor: "pointer" }}></i>{" "}
                Choose File
              </label>
              <input
                type="file"
                placeholder="image"
                id="image"
                onChange={(e) => setPhoto(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
            <div className="submit-button-wrapper">
              <input type="submit" value="Create" />
              {/* <button onClick={(e)=> handleSubmit(e)} >Create</button> */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
