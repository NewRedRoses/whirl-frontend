import { useEffect, useState } from "react";
import useCheckSession from "./hooks/useCheckSession.jsx";

import Sidebar from "./components/SideBar/Sidebar.jsx";
import PostComposer from "./components/PostComposer/PostComposer.jsx";
import Posts from "./components/Posts/Posts.jsx";
import NoContentMessage from "./components/NoContentMessage/NoContentMessage.jsx";
import FadeLoader from "react-spinners/FadeLoader";

import { validatedGetReq, validatedPostReq } from "./helpers.js";

import "./App.css";

function App() {
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useCheckSession();

  const postsUrl = `${import.meta.env.VITE_BACKEND_URL}/posts`;

  useEffect(() => {
    // Fetch posts
    validatedGetReq(postsUrl)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setIsLoading(false);
      });
  }, [postsUrl, isLoading]);

  const handlePostChange = (e) => setPost(e.target.value);

  const handlePostSubmit = (e) => {
    validatedPostReq(postsUrl, post)
      .then((response) => response.json())
      .then((data) => {
        setPosts([data, ...posts]);
        setPost("");
      });
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
          <h2>Recent posts from followed users</h2>
          {isLoading ? (
            <div className="spinner-container">
              <FadeLoader color="#808E9B" />
            </div>
          ) : (
            <>
              {posts.length > 0 ? (
                <Posts posts={posts} />
              ) : (
                <NoContentMessage caption="No Posts. Go follow some people!" />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
