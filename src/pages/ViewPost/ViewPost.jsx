import Post from "../../components/Post/Post";
import Sidebar from "../../components/SideBar/Sidebar";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { formatDistance } from "date-fns";
import useCheckSession from "../../hooks/useCheckSession.jsx";
import Comment from "../../components/Comment/Comment.jsx";

import { validatedGetReq } from "../../helpers.js";

const samplePost = {
  datePosted: new Date(),
  user: {
    profile: {},
  },
};

export default function ViewPost() {
  const [post, setPost] = useState(samplePost);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useCheckSession();

  const params = useParams();

  const commentsUrl = `${import.meta.env.VITE_BACKEND_URL}/post/id/${params.postId}/comments`;
  const postUrl = `${import.meta.env.VITE_BACKEND_URL}/post/id/${params.postId}`;

  useEffect(() => {
    // Fetch post details
    validatedGetReq(postUrl)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
      });

    validatedGetReq(commentsUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setComments(data);
      });

    setIsLoading(false);
  }, [postUrl]);

  return (
    <div className="content">
      <Sidebar />
      <div className="main-content">
        <h1>Post</h1>
        {isLoading ? (
          "Loading...."
        ) : (
          <>
            <Post
              postId={post.id}
              content={post.content}
              likesCount={post.likesNum}
              date={formatDistance(post.datePosted, new Date())}
              author={{
                displayName: post.user.profile.displayName,
                pfpUrl: post.user.profile.pfpUrl,
              }}
            />
            <h2>Comments</h2>
            <ul className="comments-list">
              {comments.length > 0 &&
                comments.map((comment, index) => (
                  <Comment key={index} props={comment} />
                ))}
              {}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
