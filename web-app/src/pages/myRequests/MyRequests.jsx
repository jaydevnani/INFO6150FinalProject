import React from "react";
import "./myRequests.scss";
import MyRequestedPosts from "../myRequestedPosts/MyRequestedPosts";


export default function MyRequests() {
  return (
    <div>
      <div className="section">
        <MyRequestedPosts />
      </div>
    </div>
  );
}
