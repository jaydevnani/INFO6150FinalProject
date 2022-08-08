import { useEffect, useState, useContext, useRef, useDebugValue } from "react";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import "./messenger.scss";
import lottie from "lottie-web";
import chat from "../../lotties/chat.json";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { io } from "socket.io-client";

export default function Messenger() {
  let user;
  if (localStorage.getItem("user")) {
    user = JSON.parse(localStorage.getItem("user"));
  } else {
    user = null;
  }
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalNewMessage] = useState(null);
  const socket = useRef(io("ws://localhost:8900"));
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalNewMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [user]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect((e) => {
    lottie.loadAnimation({
      container: document.getElementById("chat"),
      animationData: chat,
    });
  }, []);

  useEffect(
    async (e) => {
      try {
        console.log("userid = " + user._id);
        const res = await axios.get(
          "http://localhost:9000/api/conversation/" + user._id
        );
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    },
    [user._id]
  );

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:9000/api/messages/" + currentChat?._id
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId: receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(
        "http://localhost:9000/api/messages",
        message
      );
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };


  // automatically scrolls down as we get a new message.
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <div className="messenger own">
      <div className="chatMenu">
        <div className="chatMenuWrapper">

          {/* Converstaion component - to display messages  */}

          {conversations.map((c) => (
            <div
              className={c == currentChat ? "chathighlightName" : "temp"}
              onClick={() => {
                setCurrentChat(c);
              }}
            >
              <Conversation conversation={c} currentUser={user} />
            </div>
          ))}
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          {currentChat !== null ? (
            <>
              <div className="chatBoxTop">
                {messages.map((m) => (
                  <div ref={scrollRef}>
                    <Message message={m} own={m.sender === user._id} />
                  </div>
                ))}
              </div>
              <div className="chatBoxBottom">
                <textarea
                  className="chatMessageInput"
                  placeholder="Message"
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                ></textarea>
                <button className="chatSubmitButton" onClick={handleSubmit}>
                  Send
                </button>
              </div>
            </>
          ) : (
            // if the chat is empty it will display this lottie animation
            <div className="lottie-div">
              <div
                id="chat"
                className="chat-lottie"
                style={{ width: 250, height: 250 }}
              />
              <p className="chat-text"> Open a conversation to start a chat.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
