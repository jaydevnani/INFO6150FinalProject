import React from "react";
import "./myRequestedPosts.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import ModalInterested from "../../components/modalInterested/ModalInterested";
import ErrorModal from "../../components/errorModal/ErrorModal";

export default function MyRequestedPosts() {
  let user;
  if (localStorage.getItem("user")) {
    user = JSON.parse(localStorage.getItem("user"));
  } else {
    user = null;
  }
  const [allPost, setAllPost] = useState([]);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [modalShow, setModalShow] = useState(false);
  const [error, setError] = useState(null);

  useEffect(async (e) => {
    try {
      const res = await axios.get(
        `http://localhost:9000/api/posts/myRequests/${user._id}`,
        {
          headers: {
            token: `Bearer ${user.accessToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("MyRequestedPosts function result:" + res);
      {
        res.data.map((post, i) => {
          post.interestedUsers.map((iu, j) => {
            if (iu.userId == user._id) {
              console.log("IU : " + iu.status);
            }
          });
        });
      }
      setAllPost(res.data);
    } catch (error) {
      console.log(error);
      setError(error.response.data);
      setModalShow(true);
    }
  }, []);

  return (
    <div className="posts">
      <div className="postsWrapper">
        {allPost.map((post) => (
          <div className="postsCard" key={post._id}>
            <div className="postsContent">
              <div className="outerContentDiv">
                <img src="assets/Picture.jpg" className="postProfileImg" />
                <div className="divider">

                  <div className="usernameDiv">
                    <h6 className="postsUsername">{post.username}</h6>
                    <p className="myDate-time">
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      }).format(Date.parse(post.createdAt))}
                    </p>
                  </div>

                  <div className="status">
                    {post.interestedUsers.map((iu, j) => (
                      <div
                        className={iu.userId == user._id ? "showw" : "hidee"}
                      >
                        {iu.status}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="innerContentDiv">
                <h6 className="postsTitle">{post.title}</h6>
                <p className="postsDesc">{post.desc}</p>
                <div className="membersRequired">
                  <span>Members required</span>
                  &emsp;
                  <span className="members">
                    {post.membersRequired} members
                  </span>
                </div>

                <div className="topDiv">
                  <div className="topDivContent">
                    <span>Plan Type</span>
                    <h6>{post.planType}</h6>
                  </div>
                  <div className="topDivContent">
                    <span>Plan Capacity</span>
                    <h6>{post.totalMembersRequired}</h6>
                  </div>
                  <div className="topDivContent">
                    <span>Plan Price</span>
                    <h6>${post.price}/month</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ErrorModal
        text={error}
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
      />
    </div>
  );
}
