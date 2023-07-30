"use client"
import React, { useState } from "react";
import "./card.css"
import Link from "next/link";

const Blog = ({title, desc, img, author, id}) => {

    const [like, setlike] = useState(false);

    const handleLike = async () => {
        const res = await fetch(`api/blog/${id}/likes`,{
            method: "POST"
        })

        const data = await res.json();
        if(data.success === true){
            setlike(true);
        }
    }

  return (
    <>
      
        <div className="col-lg-4 col-md-6 " >
          <div className="card" style={{width: "20rem", margin: "10px 0px 0px 3rem"}}>
            <img
              src={img}
              className="card_img"
              alt="..."
              style={{height: "14rem !important"}}
            />
            <div className="card-body">
                <div style={{display: "flex", padding: "5px", marginBottom: "5px"}}>
                    <span>Author By:-</span>
                    <span style={{fontSize: "15px", fontWeight: "bold", marginLeft: "8px"}}>{author}</span>

                </div>
              <h5 className="card-title">{title}</h5>
              <p className="card-text">
                {desc.substring(0,30)}...
              </p>
             <div style={{display: "flex", justifyContent: "space-between"}}>
             <Link href={`/blogs/${id}`} className="btn btn-primarybtn btn-outline-primary">
                Read
              </Link>
              <button className="btn" onClick={handleLike}>{
                like===false ? <i className="fa-regular fa-heart" ></i>
                :
                <i className="fa-sharp fa-solid fa-heart" style={{color: "#f12009"}}></i>                
              }</button>
             </div>
            </div>
        
        </div>
      </div>
    </>
  );
};

export default Blog;
