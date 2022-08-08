import React, { useEffect, useState } from "react";
import "./conversation.scss";
import axios from "axios";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:9000/api/users?userId=" + friendId,
          {
            headers: {
              token: `Bearer ${currentUser.accessToken}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    console.log("currentUser = ", currentUser);
    console.log("conversation = ", conversation);
    getUser();
  }, [currentUser, conversation]);

  return (

    // displays the profile picture and username on the chat page
    <div className="conversation">
      <img src="assets/Picture.jpg" className="conversationImg" />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}
