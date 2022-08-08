import "./myPosts.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import ModalDelete from "../../components/modalDelete/ModalDelete";
import { BsFillTrashFill, BsCheckLg, BsXLg } from "react-icons/bs";
import ErrorModal from "../../components/errorModal/ErrorModal";

export default function MyPosts() {
  let user;
  if (localStorage.getItem("user")) {
    user = JSON.parse(localStorage.getItem("user"));
  } else {
    user = null;
  }
  const [myPost, setMyPost] = useState([]);
  const [modalShowPost, setModalShowPost] = useState(false);
  const [postId, setPostId] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [error, setError] = useState(null);

  useEffect(async (e) => {
    try {
      const res = await axios.get(
        `http://localhost:9000/api/posts/profile/${user._id}`,
        {
          headers: {
            token: `Bearer ${user.accessToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      setMyPost(res.data);
    } catch (error) {
      console.log(error);
      setError(error.response.data);
      setModalShow(true);
    }
  }, []);

  const handleDelete = async (e, postId) => {
    e.preventDefault();
    setModalShowPost(true);
    setPostId(postId);
  };

  const handleActions = async (e, userId, postId, status) => {
    e.preventDefault();
    const data = {
      userId: userId,
      postId: postId,
      status: status,
    };

    try {
      const res = await axios.post(
        "http://localhost:9000/api/interested/status",
        data,
        {
          headers: {
            token: `Bearer ${user.accessToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
      setError(error.response.data);
      setModalShow(true);
    }
  };

  return (
    <div className="myPosts">
      <div className="myPostsWrapper">

        {/*------ Posts Component - displays all the post ------- */}

        {myPost.map((post) => (
          <div className="myPostsCard" key={post._id}>
            <div className="myPostsContent">
              <div className="myOuterContentDiv">
                <img src="assets/Picture.jpg" className="myPostProfileImg" />
                <div className="topInnerContainer">
                  <div className="myUsernameDiv">
                    <h6 className="myPostsUsername">{user.username}</h6>
                    <p className="myDate-time">
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      }).format(Date.parse(post.createdAt))}
                    </p>
                  </div>

                  <div
                    className="btnContainer"
                    onClick={(e) => handleDelete(e, post._id)}
                  >
                    <span className="deleteBtn">
                      <BsFillTrashFill className="deleteIcon" />
                    </span>
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
                    <h6>{post.totalMembersRequired} people</h6>
                  </div>
                  <div className="topDivContent">
                    <span>Plan Price</span>
                    <h6>${post.price}/month</h6>
                  </div>
                </div>
              </div>

              {/* Displays the requests of all users who are interested to join this plan */}

              {post.interestedUsers.length > 0 ? (
                <h6 className="request">Requests</h6>
              ) : (
                <h6 className="emptyMsg">
                  You do not have any requests for this Post.
                </h6>
              )}
              <div className="requestsSectionBackground">
                {post.interestedUsers.map((interested, i) => (
                  <div className="requestsSection" key={i}>
                    <h6 className="myPostsUsername">{interested.username}</h6>
                    <div className="actionButton">
                      {interested.status === "Pending" ? (
                        <>
                          <button
                            className="acceptBtn"
                            onClick={(e) =>
                              handleActions(
                                e,
                                interested.userId,
                                post._id,
                                "Accepted"
                              )
                            }
                          >
                            <BsCheckLg />
                          </button>
                          <button
                            className="declineBtn"
                            onClick={(e) =>
                              handleActions(
                                e,
                                interested.userId,
                                post._id,
                                "Declined"
                              )
                            }
                          >
                            <BsXLg />
                          </button>
                        </>
                      ) : (
                        <button className="statusButton">
                          {interested.status}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/*--------- Post component end------- */}

        {/* Displays this modal when you want to delete a particular post */}

        <ModalDelete
          text="Are you sure you want to delete?"
          id={postId}
          show={modalShowPost}
          onHide={() => setModalShowPost(false)}
        />
      </div>

      {/* Displays this modal to show the error message */}

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
