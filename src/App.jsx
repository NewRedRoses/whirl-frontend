import { useEffect, useState } from "react";
import useCheckSession from "./hooks/useCheckSession.jsx";

import Sidebar from "./components/SideBar/Sidebar.jsx";
import PostComposer from "./components/PostComposer/PostComposer.jsx";
import Posts from "./components/Posts/Posts.jsx";
import NoContentMessage from "./components/NoContentMessage/NoContentMessage.jsx";

import { validatedGetReq, validatedPostReq } from "./helpers.js";

import "./App.css";

function App() {
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState([]);
  useCheckSession();

  const postsUrl = `${import.meta.env.VITE_BACKEND_URL}/posts`;

  useEffect(() => {
    // Fetch posts
    validatedGetReq(postsUrl)
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, [postsUrl]);

  const handlePostChange = (e) => setPost(e.target.value);

  const handlePostSubmit = (e) => {
    validatedPostReq(postsUrl, post);
    location.reload();
  };
  return (
    <div className="content">
      <Sidebar />

      <div className="main-content">
        <div>
          <h1>Create a Post</h1>
          <PostComposer
            post={post}
            placeholder="What've you been thinking about?"
            onPostChange={handlePostChange}
            onPostSubmit={handlePostSubmit}
          />
        </div>
        <div>
          <h2>Recent Posts</h2>
          {posts.length > 0 ? (
            <Posts posts={posts} />
          ) : (
            <NoContentMessage caption="No Posts. Go follow some people!" />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
