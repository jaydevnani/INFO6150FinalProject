import React, { useEffect } from "react";
import "./message.scss";
import { format } from "timeago.js";

export default function Message({ message, own }) {
  return (
    // displays the message bubble
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img src="assets/Picture.jpg" className="messageImg" />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
