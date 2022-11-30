import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../../actions/UserAction";
import { createChat } from "../../api/ChatRequests";


const User = ({ person, location, setModalOpened }) => {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch()
  
  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );
  const handleFollow = () => {
    following
      ? dispatch(unfollowUser(person._id, user))
      : dispatch(followUser(person._id, user));
    setFollowing((prev) => !prev);
  };

  const newChat = (e) => {
    e.preventDefault()
    createChat( { senderId: user._id, receiverId: person._id} );
    console.log("new chat");
    setModalOpened(false)
    //! set chat window to the new chat
  };

  return (
    <div className="follower">
      <div>
        <img 
          src={
            publicFolder + person.profilePicture
              ? publicFolder + person.profilePicture
              : publicFolder + "defaultProfile.png"
          }
          alt="profile"
          className="followerImage"
        />
        <div className="name">
          <span>{person.firstname}</span>
          <span>{person.lastname}</span>
        </div>
      </div>
      {location === "chat" ? <button className="button fc-button" onClick={newChat}>Chat</button> : (
      <button
        className={
          following ? "button fc-button UnfollowButton" : "button fc-button"
        }
        onClick={handleFollow}
      >
        {following ? "Unfollow" : "Follow"}
      </button>
      )
      }
    </div>
  );
};

export default User;