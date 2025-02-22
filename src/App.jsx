import { useEffect, useState } from "react";
import Post from "./components/Post/Post";
import "./App.css";

const cachedList = ["username", "pfpUrl"];

function App() {
  const [posts, setPosts] = useState([]);

  const userUrl = `${import.meta.env.VITE_BACKEND_URL}/user`;
  const postsUrl = `${import.meta.env.VITE_BACKEND_URL}/posts`;

  useEffect(() => {
    // Fetch user
    fetch(userUrl, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        cachedList.map((item) => localStorage.setItem(item, data[item]));
      });

    // Fetch posts
    fetch(postsUrl, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, [userUrl, postsUrl]);

  return (
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
  );
}

export default App;
