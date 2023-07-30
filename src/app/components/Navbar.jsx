import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <>
     <nav className="navbar navbar-expand-lg  bg-dark navbar-dark" >
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Prince Tech</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-1 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" href="/">Blogs</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" href="/create">Create</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" href="/about">About</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" href="login">Login</Link>
        </li>
      </ul>
     
    </div>
  </div>
</nav>
    </>
  );
};

export default Navbar;
