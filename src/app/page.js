"use client"
import Banner from './components/Banner';
import Blog from './components/Blog'
import {  useEffect, useState } from 'react'

const Page = () => {

  const [blog, setBlog] = useState([]);

  useEffect(() => {
    fetchblogs();
  }, [])
 

  const fetchblogs = async () => {
    const res = await fetch(`http://localhost:3000/api/blog/getallblog`);

    const data = await res.json();
    const title = data.getallblog[0].likes;
    console.log(title)
    setBlog(data.getallblog)
  }

  

  return (
    <section>

      <Banner/>
      <h2 style={{textAlign: "center"}}>All Blogs</h2>
      <div className="row" >


      {blog?.map((i) => (
        <Blog
          title={i.title}
          desc={i.description}
          key={i._id}
          id={i._id}
          author={i.author}
          img={i.image}
        />
      ))}
      {/* <Blog title={"first blog"}
            desc={"this is discription"}
            author={"prince"}
            img={"https://res.cloudinary.com/dxs2oztts/image/upload/v1689582415/e8vqg2qj2b7k8xtqbl8e.ico"}
      />
      <Blog  title={"second blog"}
            desc={"this is second discription"}
            author={"patel"}
            img={"https://res.cloudinary.com/dxs2oztts/image/upload/v1689581726/mfskr2gktprfmkulpsp7.jpg"}
            />
      <Blog   title={"third blog"}
            desc={"this is third discription"}
            author={"prince_patel"}
            img={"https://res.cloudinary.com/dxs2oztts/image/upload/v1689583288/qp6ai7x6phf2amu5hrv6.png"}/> */}
 
      </div>
    </section>
  )
}

export default Page