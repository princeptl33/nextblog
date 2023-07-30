"use client";
import React, { useContext, useState } from "react";
import "./index.css";
import { useRouter } from "next/navigation";
import { context } from "../components/UserContext";
// import {redirect} from "next/navigation"


const Page = () => {
  const router = useRouter();

  const {setUser} = useContext(context);

  const [account, toggleAcount] = useState("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [user, setUser] = useState("");

  const togglesignup = () => {
    account === "signup" ? toggleAcount("login") : toggleAcount("signup");
  };


  const handleSinup =   async (e) => {
        // console.log("register");


        e.preventDefault();
        try {
            const res =  await fetch("api/auth/register", {
                method: "POST",
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await res.json();
            // setUser(data.user);
            if(!data.success) return console.log("worng in register")
            setName("");
            setEmail("");
            setPassword("");
            // toggleAcount("signup");
            togglesignup();
            // setUser(data.user.name);
            // setUser("patel");

        } catch(error){
            return console.log(error.message);
        }
  }


  const handleLogin =   async (e) => {
    console.log("login");


    e.preventDefault();
    try {
        const res =  await fetch("api/auth/login", {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await res.json();
        if(!data) return console.log("wrong in login");
       console.log(data.message)
       setUser(data.user);

    //    return redirect("/about");
    router.push("/");
       

    } catch(error){
        return console.log(error.message)
    }
}

// if(user._id) return redirect("/");


  return (
    <>
      <div className="container main">
        <div className="row">
          {account === "login" ? 
            <div className="sec mb-5">
              <div className="card shadow p-5 animated zoomIn slow">
                <h3 className="text-center font-weight-bold text-uppercase mb-3">
                  LOGIN IN
                </h3>

                <form onSubmit={handleLogin}>
                  <div className="form-group login">
                    <label>Enter Email</label>
                    <input onChange={(e)=> setEmail(e.target.value)} type="email" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label className="mt-2">Enter Password</label>
                    <input onChange={(e)=> setPassword(e.target.value)} type="password" className="form-control " />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-outline-dark btn-block rounded-pill mt-2"
                  >
                    Login
                  </button>
                  <h6 className="mt-3">
                    Dont have an account?
                    <a  className="link-offset-1" style={{cursor: "pointer"}} onClick={() => togglesignup()}> Create Account Here</a>
                  </h6>
                </form>
              </div>
            </div>
           : 
            <div className="sec">
              <div className="card shadow p-5 animated zoomIn slow">
                <h3 className="text-center font-weight-bold text-uppercase mb-3">
                  SIGN UP
                </h3>

                <form onSubmit={handleSinup}>
                  <div className="form-group">
                    <label>Enter Nname</label>
                    <input  onChange={(e)=> setName(e.target.value)} type="text" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label className="mt-2">Enter Email</label>
                    <input  onChange={(e)=> setEmail(e.target.value)} type="Email" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label className="mt-2">Enter Password</label>
                    <input  onChange={(e)=> setPassword(e.target.value)} type="password" className="form-control" />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-outline-dark btn-block rounded-pill mt-2"
                  >
                    Register
                  </button>
                  <h6 className="mt-3">
                    Already have an account
                    <a className="link-offset-1" style={{cursor: "pointer"}} onClick={() => togglesignup()}> Login Account Here</a>
                  </h6>
                </form>
              </div>
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default Page;
