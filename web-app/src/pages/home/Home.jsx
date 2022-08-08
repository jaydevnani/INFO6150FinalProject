import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import ModalInterested from "../../components/modalInterested/ModalInterested";
import { format } from "timeago.js";
import ErrorModal from "../../components/errorModal/ErrorModal";
import "./home.scss";
import axios from "axios";

export default function Home() {
  const [userinfo, setUserInfo] = useState({ languages: [], response: [] });
  const [filteredPosts, setFilteredPosts] = useState([]);
  const planCapacity = [
    "5 members",
    "6 members",
    "7 members",
    "8 members",
    "9 members",
    "10 members",
  ];
  const planPrice = [
    "$5-$10 /month",
    "$11-$15 /month",
    "$16-$20 /month",
    "$21-$25 /month",
    "$26-$30 /month",
    "$30 or more /month",
  ];

  const handleResetClick = () => {
    setFilteredPosts([]);
    console.log("RESET clicked");
  };

  const handleCheckbox = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { languages } = userinfo;

    // Case 1 : The user checks the box
    if (checked) {
      setUserInfo({
        languages: [...languages, value],
        response: [...languages, value],
      });
    }

    // Case 2  : The user unchecks the box
    else {
      setUserInfo({
        languages: languages.filter((e) => e !== value),
        response: languages.filter((e) => e !== value),
      });
    }
  };

  const handleApplyClick = () => {
    console.log("ALL : =", allPost);
    setFilteredPosts([]);
    console.log("userInfo: ", userinfo.response);
    const temp = [];

    allPost.map((post, k) => {
      userinfo.response.map((val, i) => {
        if (
          post.planType == val ||
          post.totalMembersRequired == val / 100 ||
          (post.price < val && post.price >= val - 5)
        ) {
          temp.push(post);
        }
      });
    });

    setFilteredPosts([...new Set(temp)]);
  };

  useEffect(() => {
    console.log("OUTPUT : =" + userinfo.response);
  }, [userinfo]);

  let user;
  if (localStorage.getItem("user")) {
    user = JSON.parse(localStorage.getItem("user"));
  } else {
    user = null;
  }

  const [allPost, setAllPost] = useState([]);

  const [selectedpost, setSelectedpost] = useState("");
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [error, setError] = useState(null);

  const handleShow = (e, post) => {
    e.preventDefault();
    setShow(true);
    setSelectedpost(post);
  };

  useEffect(async (e) => {
    try {
      const res = await axios.get(
        `http://localhost:9000/api/posts/all/${user._id}`,
        {
          headers: {
            token: `Bearer ${user.accessToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      setAllPost(res.data);
    } catch (error) {
      console.log(error);
      setError(error.response.data);
      setModalShow(true);
    }
  }, []);

  return (
    <div>
      <div className="section">
        <div className="filterbar">
          <div className="filterbarWrapper">
            <div className="filterbarMenu">
              <h5 className="filterbarTitle">Filters</h5>

              <h6>Plan Name</h6>
              <div className="checkboxFilter">
                <div>
                  <input
                    onChange={handleCheckbox}
                    type="checkbox"
                    name="plans"
                    value="Essential Plan"
                  />
                  Essential
                </div>
                <div>
                  <input
                    onChange={handleCheckbox}
                    type="checkbox"
                    name="plans"
                    value="Magenta Plan"
                  />
                  Magenta
                </div>
                <div>
                  <input
                    onChange={handleCheckbox}
                    type="checkbox"
                    name="plans"
                    value="Magenta Max Plan"
                  />
                  Magenta Max
                </div>
              </div>

              <br />
              <h6>Plan Capacity</h6>
              <div className="checkboxFilter">
                <div>
                  <input
                    onChange={handleCheckbox}
                    type="checkbox"
                    name="plans"
                    value="5"
                  />
                  5 Members
                </div>
                <div>
                  <input
                    onChange={handleCheckbox}
                    type="checkbox"
                    name="plans"
                    value="6"
                  />
                  6 Members
                </div>
                <div>
                  <input
                    onChange={handleCheckbox}
                    type="checkbox"
                    name="plans"
                    value="7"
                  />
                  7 Members
                </div>
                <div>
                  <input
                    onChange={handleCheckbox}
                    type="checkbox"
                    name="plans"
                    value="8"
                  />
                  8 Members
                </div>
                <div>
                  <input
                    onChange={handleCheckbox}
                    type="checkbox"
                    name="plans"
                    value="9"
                  />
                  9 Members
                </div>
                <div>
                  <input
                    onChange={handleCheckbox}
                    type="checkbox"
                    name="plans"
                    value="10"
                  />
                  10 Members
                </div>
              </div>

              <br />
              <h6>Plan Price</h6>
              <div className="checkboxFilter">
                <div>
                  <input
                    onChange={handleCheckbox}
                    type="checkbox"
                    name="plans"
                    value="11"
                  />
                  $5 - $10 /month
                </div>
                <div>
                  <input
                    onChange={handleCheckbox}
                    type="checkbox"
                    name="plans"
                    value="16"
                  />
                  $11 - $15 /month
                </div>
                <div>
                  <input
                    onChange={handleCheckbox}
                    type="checkbox"
                    name="plans"
                    value="21"
                  />
                  $16 - $20 /month
                </div>
                <div>
                  <input
                    onChange={handleCheckbox}
                    type="checkbox"
                    name="plans"
                    value="26"
                  />
                  $21 - $25 /month
                </div>
                <div>
                  <input
                    onChange={handleCheckbox}
                    type="checkbox"
                    name="plans"
                    value="31"
                  />
                  $26 - $30 /month
                </div>
                <div>
                  <input
                    onChange={handleCheckbox}
                    type="checkbox"
                    name="plans"
                    value="32"
                  />
                  $31+ /month
                </div>
              </div>

              <br />
              <div className="buttonSection">
                <button className="resetBtn" onClick={handleResetClick}>
                  {" "}
                  Reset
                </button>
                <button className="applyBtn" onClick={handleApplyClick}>
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="posts">
          {filteredPosts.length == 0 ? (
            <div className="postsWrapper">
              {allPost.map((post) => (
                <div className="postsCard" key={post._id}>
                  <div className="postsContent">
                    <div className="outerContentDiv">
                      <img
                        src="assets/Picture.jpg"
                        className="postProfileImg"
                      />
                      <div className="usernameDiv">
                        <h6 className="postsUsername">{post.username}</h6>
                        <p className="date-time">{format(post.createdAt)}</p>
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
                    <button
                      className="postsInterestedBtn"
                      onClick={(e) => handleShow(e, post)}
                    >
                      Interested
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="postsWrapper">
              {filteredPosts.map((posts) => (
                <div className="postsCard" key={posts._id}>
                  <div className="postsContent">
                    <div className="outerContentDiv">
                      <img
                        src="assets/Picture.jpg"
                        className="postProfileImg"
                      />
                      <div className="usernameDiv">
                        <h6 className="postsUsername">{posts.username}</h6>
                        <p className="date-time">{format(posts.createdAt)}</p>
                      </div>
                    </div>

                    <div className="innerContentDiv">
                      <h6 className="postsTitle">{posts.title}</h6>
                      <p className="postsDesc">{posts.desc}</p>
                      <div className="membersRequired">
                        <span>Members required</span>
                        &emsp;
                        <span className="members">
                          {posts.membersRequired} members
                        </span>
                      </div>

                      <div className="topDiv">
                        <div className="topDivContent">
                          <span>Plan Type</span>
                          <h6>{posts.planType}</h6>
                        </div>
                        <div className="topDivContent">
                          <span>Plan Capacity</span>
                          <h6>{posts.totalMembersRequired}</h6>
                        </div>
                        <div className="topDivContent">
                          <span>Plan Price</span>
                          <h6>${posts.price}/month</h6>
                        </div>
                      </div>
                    </div>
                    <button
                      className="postsInterestedBtn"
                      onClick={(e) => handleShow(e, posts)}
                    >
                      Interested
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <ModalInterested
            show={show}
            onHide={() => setShow(false)}
            selectedpost={selectedpost}
          />
          <div>
            <ErrorModal
              text={error}
              show={modalShow}
              onHide={() => {
                setModalShow(false);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
