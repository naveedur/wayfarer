import React, { useState, useEffect } from "react";
import "./tripChat.css";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const TripChat = ({ tripId}) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const { user } = useSelector((state) => state.loginUser) || {};

  useEffect(() => {
    const fetchComments = async () => {
      const { data } = await axios.get(`/api/blog/comments/${tripId}`);
      setComments(data.data.reverse());
    }

    fetchComments();
  }, [tripId]);
  const handleInputChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = async () => {
    if (newComment.trim() !== "") {
      const comment = {
        user: user.data.name,
        text: newComment,
        post: tripId,
      };
      await axios.post("/api/blog/add-comment", comment);
      const updatedComments = [comment,...comments];
      setComments(updatedComments);
      setNewComment("");
      toast.success("message added");
    }
  };



 

  return (
    <div className="comment-container">


      <h2>Chats ({comments.length})</h2>

      {/* Add new comment */}
      <div className="add-comment">
        <textarea
          className="comment-input"
          placeholder="Write a comment..."
          value={newComment}
          onChange={handleInputChange}
        ></textarea>
        <button className="add-comment-button mb-4" onClick={handleAddComment}>
          Message
        </button>
      </div>



      {comments.reverse().map((comment) => (
        <div key={comment._id} className="col-12 col-md-6  my-3">
          <div className="commented-by">
            <img src="http://localhost:3000/assets/slider/slider1.jpg" alt="" />
            <div>
            <span style={{marginRight:"6px"}}><b>{comment.user}</b></span>
              <span>{dayjs(comment.createdAt).fromNow()}</span>           
                 <p  className="mt-1 commentText">{comment.text}</p>
            </div>
          </div>
        </div>
      ))}

    </div>
  );
};

export default TripChat;
