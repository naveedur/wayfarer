import React, { useState, useEffect, useMemo, useCallback } from "react";
import "./tripChat.css";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import dayjs from 'dayjs';
import { domain } from "../../domain.js";

import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const TripChat = ({ tripId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const { user } = useSelector((state) => state.loginUser) || {};
  const memoizedUser = useMemo(() => user, [user]);

  useEffect(() => {
    const fetchComments = async () => {
      if (tripId) {
        try {
          const { data } = await axios.get(`${domain}/api/blog/comments/${tripId}`);
          setComments(data.data.reverse());
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      }
    };

    fetchComments();
  }, [tripId]);

  const handleInputChange = useCallback((event) => {
    setNewComment(event.target.value);
  }, []);

  const handleAddComment = useCallback(async () => {
    if (newComment.trim() !== "") {
      const comment = {
        user: memoizedUser.data.name,
        text: newComment,
        post: tripId,
      };
      try {
        await axios.post(`${domain}/api/blog/add-comment`, comment);
        const updatedComments = [comment, ...comments];
        setComments(updatedComments);
        setNewComment("");
        toast.success("Message added");
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  }, [newComment, comments, tripId, memoizedUser.data.name]);

  return (
    <div className="comment-container">
      <h2>Chats ({comments.length})</h2>

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

      {comments.map((comment) => (
        <div key={comment._id} className="col-12 col-md-6 my-3">
          <div className="commented-by">
            <img src="http://localhost:3000/assets/slider/slider1.jpg" alt="" />
            <div>
              <span style={{ marginRight: "6px" }}><b>{comment.user}</b></span>
              <span>{dayjs(comment.createdAt).fromNow()}</span>
              <p className="mt-1 commentText">{comment.text}</p>
            </div>
          </div>
        </div>
      ))}

    </div>
  );
};

export default TripChat;
