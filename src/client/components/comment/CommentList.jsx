import React, {useEffect, useState} from 'react';
import ReplyForm from './ReplyForm';
import { AiOutlineLike, AiOutlineDislike, AiFillStar, AiOutlineStar } from "react-icons/ai";
import './styles/CommentList.css'
import Pagination from "./Pagination";
import { useUser } from '../../pages/personalspace/userContext/UserContext';
import axios from "axios";
function CommentList({ productId, onReply, userActions, setUserActions }) {
    const { user } = useUser();
    const [currentPage, setCurrentPage] = useState(1);
    const COMMENTS_PER_PAGE = 3; // Adjust this number based on your preference

    const indexOfLastComment = currentPage * COMMENTS_PER_PAGE;
    const indexOfFirstComment = indexOfLastComment - COMMENTS_PER_PAGE;
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);
    const [replyVisibility, setReplyVisibility] = useState({}); // State to manage the visibility of each ReplyForm

    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/products/${productId}/comments`);
                console.log("Fetched Comments:", response.data);  // Log the fetched comments
                setComments(response.data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchComments();
    }, [productId]);

    const handleKeyPress = (e, commentId) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleReplySubmit(commentId, e.target.value);
            e.target.value = ''; // Clear the textarea
        }
    };
    const toggleReply = (commentId) => {
        setReplyVisibility(prevState => ({
            ...prevState,
            [commentId]: !prevState[commentId]
        }));
    };
    const handleReplySubmit = async (commentId, newReply) => {
        // Map through the comments
        const updatedComments = comments.map(comment => {
            // If the comment's id matches the one we're replying to
            if (comment.id === commentId) {
                // Return a new object with the existing comment data and the new reply added to its replies array
                return {
                    ...comment,
                    replies: [...(comment.replies || []), newReply]
                };
            }
            // If the comment's id doesn't match, return it unchanged
            return comment;
        });
        // Update the comments state with the new array
        setComments(updatedComments);
        // Hide the reply form for the comment we just replied to
        setReplyVisibility(prevState => ({ ...prevState, [commentId]: false }));

        // try {
        //     await axios.post(`http://localhost:4000/user/comments/${commentId}/replies`, { reply: newReply }); // Adjusted the endpoint
        // } catch (error) {
        //     console.error("Error posting reply:", error);
        // }
    };



    const handleLike = async (commentId) => {
        if (userActions[commentId] !== 'like') {
            const updatedComments = comments.map(comment => {
                if (comment.id === commentId) {
                    return {
                        ...comment,
                        likes: (comment.likes || 0) + 1,
                        // Only decrease dislikes if the previous action was a dislike
                        dislikes: userActions[commentId] === 'dislike' ? (comment.dislikes || 0) - 1 : (comment.dislikes || 0)
                    };
                }
                return comment;
            });
            setComments(updatedComments);
            setUserActions({ ...userActions, [commentId]: 'like' });
        }

        // try {
        //     await axios.put(`http://localhost:4000/user/comments/${commentId}/like`); // Adjusted the endpoint
        // } catch (error) {
        //     console.error("Error updating like:", error);
        // }
    };

    const handleDislike = async (commentId) => {
        if (userActions[commentId] !== 'dislike') {
            const updatedComments = comments.map(comment => {
                if (comment.id === commentId) {
                    return {
                        ...comment,
                        dislikes: (comment.dislikes || 0) + 1,
                        // Only decrease likes if the previous action was a like
                        likes: userActions[commentId] === 'like' ? (comment.likes || 0) - 1 : (comment.likes || 0)
                    };
                }
                return comment;
            });
            setComments(updatedComments);
            setUserActions({ ...userActions, [commentId]: 'dislike' });
        }

        // try {
        //     await axios.put(`http://localhost:4000/user/comments/${commentId}/dislike`); // Adjusted the endpoint
        // } catch (error) {
        //     console.error("Error updating dislike:", error);
        // }
    };


    return (
        <div className="comment-list">
            {currentComments.map((comment) => (
                <div key={comment.id} className="comment">

                    <div className="user-info">
                        {/*<img src={comment.userAvatar} alt="User Avatar" />*/}
                        <span style={{padding:'10px'}}>{comment.name}</span>
                    </div>

                    <div className="comment-header" >
                        <strong style={{ fontSize: '1.2em' }}>{comment.title}</strong>
                        <div className="stars" style={{marginLeft:'10px'}}>
                            {[...Array(5)].map((_, index) => {
                                const StarIcon = index < comment.rating ? AiFillStar : AiOutlineStar;
                                return (
                                    <StarIcon
                                        key={index}
                                        size={20}
                                        color={index < comment.rating ? '#FFD700' : '#A9A9A9'}
                                    />
                                );
                            })}
                        </div>
                    </div>

                    <div className="comment-date" style={{paddingLeft:'10px',paddingTop:'2px'}}>
                        {comment.date && comment.date instanceof Date ?
                            `${comment.date.getHours()}:${comment.date.getMinutes()},
                            ${comment.date.getDate()}/${comment.date.getMonth() + 1}/${comment.date.getFullYear()},
                            ${comment.location}`
                            : 'N/A'}
                    </div>

                    <p style={{paddingLeft:'10px',paddingTop:'2px'}}>{comment.comment}</p>

                    <div className="comment-actions" style={{paddingLeft:'10px'}}>
                        <AiOutlineLike
                            size={20}
                            color={userActions[comment.id] === 'like' ? '#FFD700' : '#A9A9A9'}
                            onClick={() => handleLike(comment.id)}
                        />
                        <span style={{paddingRight:'5px'}}>{comment.likes}</span>
                        <AiOutlineDislike
                            size={20}
                            color={userActions[comment.id] === 'dislike' ? '#FFD700' : '#A9A9A9'}
                            onClick={() => handleDislike(comment.id)}
                        />
                        <span>{comment.dislikes}</span>
                    </div>


                    <div className="comment-content">

                        {comment.images && comment.images.map((image, index) => (
                            <img key={index} src={URL.createObjectURL(image)} alt="Uploaded" style={{ width: '200px', height: '200px' }} />
                        ))}
                        {comment.video &&
                            <video width="200" height="200" controls>
                                <source src={URL.createObjectURL(comment.video)} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        }
                        <button onClick={() => toggleReply(comment.id)}>Reply</button>
                        {replyVisibility[comment.id] && (
                            <div className="reply-container">
                                <ReplyForm onReply={(reply) => handleReplySubmit(comment.id, reply)} />
                            </div>
                        )}

                        <div className="replies">
                            {Array.isArray(comment.replies) && comment.replies.map((reply, index) => (
                                <div key={index} className="reply">
                                    <p>{reply}</p>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            ))}
            <Pagination
                totalComments={comments.length}
                commentsPerPage={COMMENTS_PER_PAGE}
                currentPage={currentPage}
                paginate={setCurrentPage}
            />

        </div>
    );
}



export default CommentList;
