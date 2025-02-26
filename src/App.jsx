import { useEffect, useState } from "react";
import useCheckSession from "./hooks/useCheckSession.jsx";

import Sidebar from "./components/SideBar/Sidebar.jsx";
import PostComposer from "./components/PostComposer/PostComposer.jsx";
import Posts from "./components/Posts/Posts.jsx";

import { validatedGetReq } from "./helpers.js";

import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  useCheckSession();

  const postsUrl = `${import.meta.env.VITE_BACKEND_URL}/posts`;

  useEffect(() => {
    // Fetch posts
    validatedGetReq(postsUrl)
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
