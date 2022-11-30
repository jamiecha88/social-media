import React, { useEffect, useState } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { likePost } from "../../api/PostsRequests";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import { getUser } from "../../api/UserRequests";

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length)
  const [poster, setPoster] = useState(null);
const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  
  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked? setLikes((prev)=>prev-1): setLikes((prev)=>prev+1)
  };

  
  const posterId = data.userId; 
  

  useEffect(() => {
    const fetchPoster = async () => {
      try {
        const { data } = await getUser(posterId);
         setPoster(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPoster();
  }, [posterId]);

 
 

  return (
    <div className="Post">
      <div className="Post_header">

        <div className="Post_header_left">
          <img src={serverPublic + poster?.profilePicture} alt="" />
          <div className="Post_header_left_info">
            <span>{poster?.firstname} </span>
            <span>{poster?.lastname}</span>
          </div>
        </div>
        <div className="Post_header_right">
          <span>{format(data.createdAt)}</span>
        </div>
      </div>
      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt=""
      />

      <div className="postReact">
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>
      <div className="detail">
        <span>
          <b>{data.name} </b>
        </span>
        <span>{data.desc}</span>
      </div>
    </div>
  );
};

export default Post;