import React, { useState, useRef } from "react";
import "./createPost.scss";
import { Form, Button } from "react-bootstrap";
import MyVerticallyCenteredModal from "../../components/modal/Modal";
import Topbar from "../../components/topbar/Topbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../../components/errorModal/ErrorModal";

export default function CreatePost() {
  let user;
  if (localStorage.getItem("user")) {
    user = JSON.parse(localStorage.getItem("user"));
  } else {
    user = null;
  }

  const title = useRef();
  const description = useRef();
  const price = useRef();
  const [selectedPlanType, setselectedPlanType] = useState("");
  const [selectedPlanCapacity, setSelectedPlanCapacity] = useState("");
  const [selectedMemberRequired, setSelectedMemberRequired] = useState("");
  const [modalShowPost, setModalShowPost] = useState(false);
  const planType = ["Essential Plan", "Magenta Plan", "Magenta Max Plan"];
  const planCapacity = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const [membersRequired, setMembersRequired] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [error, setError] = useState(null);

  //Validation handling
  const createPost = async (e) => {
    e.preventDefault();

    if (
      selectedPlanType === "" ||
      selectedPlanCapacity === "" ||
      selectedMemberRequired === ""
    ) {
      setError("Please complete all fields!");
      setModalShow(true);
    } else {
      try {
        const post = {
          userId: user._id,
          username: user.username,
          title: title.current.value,
          desc: description.current.value,
          price: price.current.value,
          planType: selectedPlanType,
          totalMembersRequired: selectedPlanCapacity,
          membersRequired: selectedMemberRequired,
        };

        //Calling API with accesstoken
        const res = await axios.post("http://localhost:9000/api/posts", post, {
          headers: {
            token: `Bearer ${user.accessToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        console.log("res = " + res);
        setModalShowPost(true);
      } catch (error) {
        console.log(error);
        setError(error.response.data);
        setModalShow(true);
      }
    }
  };


  // Used navigate to go to the next page after submitting the post.
  let navigate = useNavigate();
  const routeChange = () => {
    console.log("inside");
    setModalShowPost(false);
    let path = `../myPosts`;
    navigate(path);
  };

  return (
    <>
      <Topbar />
      <div className="bgCreatePost">

        <div className="createPost">
          <div className="createWrapper">
            <h5 className="createHeading">Create New Post</h5>
            <div className="createForm">

              {/* -----Form to create a new post - used react bootstrap form -----*/}

              <Form onSubmit={createPost}>
                <Form.Group className="mb-3">
                  <Form.Label>Enter Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter title"
                    required
                    ref={title}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Enter Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Enter description..."
                    style={{ height: "100px" }}
                    required
                    ref={description}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label> Enter Price </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter price"
                    required
                    ref={price}
                  />
                </Form.Group>
                <Form.Select
                  aria-label="Select a Plan"
                  className="mb-3 dropdown-basic"
                  onChange={(e) => {
                    setselectedPlanType(e.target.value);
                  }}
                  required
                >
                  <option>Select a Plan</option>
                  {planType.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </Form.Select>
                <Form.Select
                  aria-label="Select Plan Capacity"
                  className="mb-3 dropdown-basic"
                  onChange={(e) => {
                    setSelectedPlanCapacity(e.target.value);
                    let temp = [];
                    for (let i = 1; i < parseInt(e.target.value); i++) {
                      temp.push(i.toString());
                    }
                    setMembersRequired(temp);
                  }}
                  required
                >
                  <option>Select Plan Capacity</option>
                  {planCapacity.map((capacity) => (
                    <option key={capacity} value={capacity}>
                      {capacity}
                    </option>
                  ))}
                </Form.Select>
                <Form.Select
                  aria-label="Members Required"
                  className="mb-3 dropdown-basic"
                  onChange={(e) => {
                    setSelectedMemberRequired(e.target.value);
                  }}
                  required
                >
                  <option>Members Required</option>
                  {membersRequired.map((members) => (
                    <option key={members} value={members}>
                      {members}
                    </option>
                  ))}
                </Form.Select>
                <Button className="createSaveBtn" type="submit">
                  Submit Post
                </Button>
              </Form>

              {/* ------- Form end ------ */}

            </div>

            {/* Displays this modal after the post is submitted */}

            <MyVerticallyCenteredModal
              text="Post Submitted!"
              show={modalShowPost}
              onHide={routeChange}
            />
          </div>
        </div>
      </div>
      <ErrorModal
        text={error}
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
      />
    </>
  );
}
