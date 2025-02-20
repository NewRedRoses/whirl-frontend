import { useEffect, useState } from "react";
import Post from "./components/Post/Post";
import "./App.css";
function App() {
  const [posts, setPosts] = useState([]);

  const url = `${import.meta.env.VITE_BACKEND_URL}/posts`;

  useEffect(() => {
    fetch(url, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <>
      <ul className={"posts-list"}>
        {posts.map((post) => {
          return (
            <li key={post.id}>
              <Post
                content={post.content}
                date={post.datePosted}
                likesCount={post.likesNum}
                author={{
                  displayName: post.user.profile.displayName,
                  pfpUrl: post.user.profile.pfpUrl,
                }}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
