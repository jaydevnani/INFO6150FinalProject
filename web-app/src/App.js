import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import CreatePost from "./pages/createPost/CreatePost";
import Profile from "./pages/profile/Profile";
import Messenger from "./pages/messenger/Messenger";
import Topbar from "./components/topbar/Topbar";
import MyPosts from "./pages/myPosts/MyPosts";
import Otp from "./pages/otp/Otp";
import MyRequests from "./pages/myRequests/MyRequests";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

export default function App() {
  let user;
  if (localStorage.getItem("user")) {
    user = JSON.parse(localStorage.getItem("user"));
    console.log("user is present");
    console.log("data type of user = " + typeof user);
    console.log(user);
  } else {
    user = null;
    console.log("else block !!");
  }

  return (
    // React router to navigate to different pages
    <BrowserRouter>
      {user ? <Topbar /> : <></>}
      <Routes>
        <Route
          exact
          path="/"
          element={user == null || user == undefined ? <Login /> : <Home />}
        />
        <Route
          path="/login"
          element={user == null || user == undefined ? <Login /> : <Home />}
        />
        <Route
          path="/register"
          element={user == null || user == undefined ? <Register /> : <Home />}
        />
        <Route
          path="/profile"
          element={user == null || user == undefined ? <Login /> : <Profile />}
        />
        <Route
          path="/messenger"
          element={
            user == null || user == undefined ? <Login /> : <Messenger />
          }
        />
        <Route path="/otp" element={<Otp />} />
        <Route
          path="/createPosts"
          element={
            user == null || user == undefined ? <Login /> : <CreatePost />
          }
        />
        <Route
          path="/myPosts"
          element={user == null || user == undefined ? <Login /> : <MyPosts />}
        />
        <Route
          path="/myRequests"
          element={
            user == null || user == undefined ? <Login /> : <MyRequests />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
