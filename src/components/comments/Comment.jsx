import React, { useState, useEffect, useMemo, useCallback } from "react";
import "./comment.css";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import dayjs from 'dayjs';
import { domain } from "../../domain.js";

import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const Comment = ({ postId, postRating, updateRatings, totalRatings }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  
  const { user } = useSelector((state) => state.loginUser) || {};
  const memoizedUser = useMemo(() => user, [user]);

  useEffect(() => {
    const fetchComments = async () => {
      if(postId){
        try {
          const { data } = await axios.get(`${domain}/api/blog/comments/${postId}`);
          setComments(data.data);
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      }
      
    };

    fetchComments();
  }, [postId]);

  const handleInputChange = useCallback((event) => {
    setNewComment(event.target.value);
  }, []);

  const handleAddComment = useCallback(async () => {
    if (newComment.trim() !== "") {
      const comment = {
        user: memoizedUser.data ? memoizedUser.data.name : "Unknown User",
        text: newComment,
        post: postId,
      };
      try {
        await axios.post(`${domain}/api/blog/add-comment`, comment);
        const updatedComments = [comment, ...comments];
        setComments(updatedComments);
        setNewComment("");
        toast.success("Comment added");
      } catch (error) {
        console.error("Error adding comment:", error);
        // Handle the error as needed (e.g., show an error message).
      }
    }
  }, [newComment, comments, memoizedUser.data, postId]);

  return (
    <div className="comment-container">
      <h2>Comments ({comments.length})</h2>

      {/* Add new comment */}
      <div className="add-comment">
        <textarea
          className="comment-input"
          placeholder="Write a comment..."
          value={newComment}
          onChange={handleInputChange}
        ></textarea>
        <button className="add-comment-button mb-4" onClick={handleAddComment}>
          Add Comment
        </button>
      </div>

      {comments.map((comment) => (
        <div key={comment._id} className="col-12 col-md-6 my-3">
          <div className="commented-by">
            <img src="http://localhost:3000/assets/slider/slider1.jpg" alt="" />
            <div>
              <span style={{ marginRight: "6px" }}><b>{comment.user}</b></span>
              <span>{dayjs(comment.createdAt).fromNow()}</span>
              <p className=" mt-1 commentText">{comment.text}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comment;
