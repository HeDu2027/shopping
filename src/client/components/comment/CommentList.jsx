import React, { useState } from 'react';
import ReplyForm from './ReplyForm';
import { AiOutlineLike, AiOutlineDislike, AiFillStar, AiOutlineStar } from "react-icons/ai";


function CommentList({ comments, onReply,setComments, userActions, setUserActions }) {
    const [currentPage, setCurrentPage] = useState(1);
    const COMMENTS_PER_PAGE = 3; // Adjust this number based on your preference

    const indexOfLastComment = currentPage * COMMENTS_PER_PAGE;
    const indexOfFirstComment = indexOfLastComment - COMMENTS_PER_PAGE;
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);
    const [replyVisibility, setReplyVisibility] = useState({}); // State to manage the visibility of each ReplyForm

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
    const handleReplySubmit = (commentId, newReply) => {
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
    };



    const handleLike = (commentId) => {
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
    };

    const handleDislike = (commentId) => {
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
    };


    return (
        <div className="comment-list">
            {currentComments.map((commentObj) => (
                <div key={commentObj.id} className="comment">

                    <div className="user-info">
                        <img src={commentObj.userAvatar} alt="User Avatar" />
                        <span>{commentObj.userName}</span>
                    </div>

                    <div className="comment-header">
                        <strong style={{ fontSize: '1.2em' }}>{commentObj.title}</strong>
                        <div className="stars" style={{ marginLeft: '5px' }}>
                            {[...Array(5)].map((_, index) => {
                                const StarIcon = index < commentObj.rating ? AiFillStar : AiOutlineStar;
                                return (
                                    <StarIcon
                                        key={index}
                                        size={20}
                                        color={index < commentObj.rating ? '#FFD700' : '#A9A9A9'}
                                    />
                                );
                            })}
                        </div>
                    </div>

                    <div className="comment-date">
                        {commentObj.date && commentObj.date instanceof Date ?
                            `${commentObj.date.getHours()}:${commentObj.date.getMinutes()}, 
         ${commentObj.date.getDate()}/${commentObj.date.getMonth() + 1}/${commentObj.date.getFullYear()}, 
         ${commentObj.location}`
                            : 'N/A'}
                    </div>

                    {}
                    {}
                    {}



                    <p>{commentObj.comment}</p>

                    <div className="comment-actions">
                        <AiOutlineLike
                            size={20}
                            color={userActions[commentObj.id] === 'like' ? '#FFD700' : '#A9A9A9'}
                            onClick={() => handleLike(commentObj.id)}
                        />
                        <span>{commentObj.likes}</span>
                        <AiOutlineDislike
                            size={20}
                            color={userActions[commentObj.id] === 'dislike' ? '#FFD700' : '#A9A9A9'}
                            onClick={() => handleDislike(commentObj.id)}
                        />
                        <span>{commentObj.dislikes}</span>
                    </div>


                    <div className="comment-content">
                        {}
                        {}
                        {}
                        {}
                        {}
                        {}
                        {}
                        {}
                        {}
                        {}
                        {}
                        {}
                        {}
                        {commentObj.images && commentObj.images.map((image, index) => (
                            <img key={index} src={URL.createObjectURL(image)} alt="Uploaded" style={{ width: '200px', height: '200px' }} />
                        ))}
                        {commentObj.video &&
                            <video width="200" height="200" controls>
                                <source src={URL.createObjectURL(commentObj.video)} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        }
                        <button onClick={() => toggleReply(commentObj.id)}>Reply</button>
                        {replyVisibility[commentObj.id] && (
                            <div className="reply-container">
                                <ReplyForm onReply={(reply) => handleReplySubmit(commentObj.id, reply)} />
                            </div>
                        )}

                        <div className="replies">
                            {Array.isArray(commentObj.replies) && commentObj.replies.map((reply, index) => (
                                <div key={index} className="reply">
                                    <p>{reply}</p>
                                </div>
                            ))}
                        </div>

                        {}
                        {}
                        {}
                        {}
                        {}
                        {}
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

const Pagination = ({ totalComments, commentsPerPage, currentPage, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalComments / commentsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className='pagination'>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <a onClick={() => paginate(number)} className='page-link'>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};


export default CommentList;
