import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import Sidebar from "./components/SideBar/Sidebar.jsx";
import PostComposer from "./components/PostComposer/PostComposer.jsx";

import "./App.css";
import Posts from "./components/Posts/Posts.jsx";

function App() {
  const [posts, setPosts] = useState([]);

  const postsUrl = `${import.meta.env.VITE_BACKEND_URL}/posts`;
  const checkSessionUrl = `${import.meta.env.VITE_BACKEND_URL}/auth/check-session`;

  const navigate = useNavigate();

  useEffect(() => {
    fetch(checkSessionUrl, {
      credentials: "include",
    }).then((response) => {
      if (response.status != 200) {
        localStorage.removeItem("pfpUrl");
        navigate("/login");
      }
    });

    // Fetch posts
    fetch(postsUrl, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, [postsUrl]);

  return (
    <div className="content">
      <Sidebar />

      <div className="main-content">
        <div>
          <h1>Posts</h1>
          <PostComposer />
        </div>
        <div>
          <h2>Recent Posts</h2>
          <Posts posts={posts} />
        </div>
      </div>
    </div>
  );
}

export default App;
