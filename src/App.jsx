import { useEffect, useState } from "react";
import { UserContext, useUser } from "./main.jsx";
import Post from "./components/Post/Post";
import "./App.css";

function App() {
  const { user, setUser } = useUser();
  const [posts, setPosts] = useState([]);

  const userUrl = `${import.meta.env.VITE_BACKEND_URL}/user`;
  const postsUrl = `${import.meta.env.VITE_BACKEND_URL}/posts`;

  useEffect(() => {
    // Fetch user
    fetch(userUrl, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setUser(data));

    // Fetch posts
    fetch(postsUrl, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, [userUrl, postsUrl]);

  return (
    <UserContext.Provider value={user}>
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
    </UserContext.Provider>
  );
}

export default App;
