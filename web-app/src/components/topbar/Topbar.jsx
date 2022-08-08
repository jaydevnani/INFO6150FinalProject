import React from "react";
import "./topbar.scss";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

export default function Topbar() {
  let navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    console.log("logout");
    document.location.href = "/login";
  };

  return (

    // ----- Navigation bar start----
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo"><a href="/">MOBILE PLAN FINDER</a></span>
        </div>
        {/* ----- Navbar items ----- */}
        <div className="topCenter">
          <ul className="topbarList">
            <Link className="link" to="/">
              <li className="topbarListItem">Home</li>
            </Link>
            <Link className="link" to="/messenger">
              <li className="topbarListItem">Chats</li>
            </Link>
            <Link className="link" to="/createPosts">
              <li className="topbarListItem">Create New Post</li>
            </Link>
            <Link className="link" to="/myPosts">
              <li className="topbarListItem">My Posts</li>
            </Link>
            <Link className="link" to="/myRequests">
              <li className="topbarListItem">My Requests</li>
            </Link>
          </ul>
        </div>

        {/* -----Navbar items end ----- */}

        <div className="topRight">
          <Link className="link" to="/profile">
            <div className="topbarIconContainer">
              <BsPersonCircle />
            </div>
          </Link>
          <Link className="link" to="/login">
            <button className="topbarIconContainer link" onClick={handleLogout}>
              Logout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
