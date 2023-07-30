"use client";
import React, { useContext, useEffect, useState } from 'react'
import "./single.css";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { context } from '@/app/components/UserContext';
const Page = ({params}) => {

    const [post, setPost] = useState([]);
    const {user} = useContext(context);

    const [edit, setedit] = useState(false);

    const id = params.id;
    const router = useRouter();

    useEffect(() => {
        fetchpost();
     }, [])
    
    const fetchpost = async () => {
        const response = await fetch(`http://localhost:3000/api/blog/${id}/getpost`,{
            cache: "no-cache",
        });
        
        const data = await response.json();
        setPost(data.blog);
        
        // console.log(data.blog);
        if(data.blog.autorId === user._id ){
          setedit(true)
        }

        if (data.success === true) {
            
            router.refresh();
        }
    }
    
    // if (user._id === post.authorId) {
    //   console.log("i am prince  patel")
    //   setedit(true);
    // }

    const handleDelete = async() => {
        const res = await fetch(`http://localhost:3000/api/blog/${id}/deleteblog`, {
            method: 'DELETE'
        })

        if(res.status === 201){
            router.push("/")
        }
    }  

  return (
    <>
        <div className=" main">
        <img
          src={post.image}
          alt="blog_img"
          className="image"
        />
        <div className="second_part">
          <div className="author">
            <span>Author By:-</span>
            <strong>
              {post.author}
            </strong>
          </div>

          <div className="author">
            <span>Created At:-</span>
            <strong>
              {post.createdAt}
            </strong>
          </div>

          <div className="author">
            <span>Likes❤:-</span>
            <strong>
              {post.likes}
            </strong>
          </div>

        
       
          <div className="update">
            
          {
          edit? (
            <div>
              <Link className="btn" href={`/blogs/${id}/update`} ><i className="fa-solid fa-pen-to-square" style={{color: "#7da4e8"}}></i></Link>
            <button className="btn" onClick={handleDelete}><i className="fa-solid fa-trash" style={{color: "#f21f07"}}></i></button>
            </div>
          ) 
          : (
            <div></div>
          )
        }
          </div>
        </div>
        <div className="third_part">
          <div className="title">
            <h3>{post.title}</h3>
          </div>
          <div className="desc">
          <p className="lead">{post.description}</p>
          </div>
        </div>
      </div>
    </>

  )
}

export default Page