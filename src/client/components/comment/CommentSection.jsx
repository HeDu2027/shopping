import React, {useEffect, useState} from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import './styles/CommentSection.css'
import {useDispatch, useSelector} from 'react-redux';
import {addComment, updateComments, setUserActions} from '../../redux/actions/reviewActions';
import {useUser} from "../../pages/personalspace/userContext/UserContext";
import axios from "axios";
import { useParams } from 'react-router-dom';
function CommentSection() {
    const { id: productId } = useParams();
    const { user: currentUser } = useUser();
    console.log("Current User:", currentUser);
    console.log("Product ID:", productId);

    const dispatch = useDispatch();
    const reviews = useSelector((state) => state.reviews.comments);
    const userActionsState = useSelector((state) => state.reviews.userActions);
    const [comments, setComments] = useState(["Hello", "World"]);


    const handleReply = (commentId, newReply) => {
        const updatedComments = reviews.map(comment => {
            if (comment.id === commentId) {
                return {
                    ...comment,
                    replies: [...(comment.replies || []), newReply]
                };
            }
            return comment;
        });
        dispatch(updateComments(updatedComments));
    };

    // const [comments, setComments] = useState([
    //     {
    //         id: 1,
    //         userAvatar: 'path_to_avatar',
    //         userName: 'John',
    //         rating: 5,
    //         comment: 'Great product!',
    //         replies: [],
    //         likes: 0,
    //         dislikes: 0
    //     }
    // ]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('date');
    const [starFilter, setStarFilter] = useState(null);
    const [contentFilter, setContentFilter] = useState('all');
    const [userActions, setUserActions] = useState({
        commentId1: 'like',
        commentId2: 'dislike',
    });
    const [language, setLanguage] = useState('es');

    const translatePage = async () => {
        try {
            const translated = await Promise.all(comments.map(async comment => {
                const response = await fetch('/routes/translate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({text: comment.comment, targetLanguage: language})
                });
                const data = await response.json();
                return {...comment, comment: data.translations[0]};
            }));
            setComments(translated);
        } catch (error) {
            console.error("Translation failed:", error);
        }
    };

    const filteredComments = comments.filter(comment =>
        comment.comment && comment.comment.toLowerCase().includes(searchTerm.toLowerCase())
    ).filter(comment =>
        starFilter ? comment.rating === starFilter : true
    ).filter(comment => {
        switch (contentFilter) {
            case 'images':
                return comment.images && comment.images.length > 0;
            case 'videos':
                return comment.video;
            case 'both':
                return comment.images && comment.images.length > 0 || comment.video;
            default:
                return true;
        }
    });


    useEffect(() => {
        if (!productId) return;
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/products/${productId}/comments`);
                if (response.data && response.data.length > 0) {
                    setComments(response.data);
                } else {
                    console.log("No comments found for this product.");
                }
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchComments();
    }, [productId]);



    const handleCommentSubmit = async (newComment) => {
        const commentData = {
            ...newComment,
            userId: currentUser._id,  // Use the _id field from currentUser
            projectId: productId
        };
        console.log('Data being sent:', commentData);

        if (!currentUser || !currentUser._id) {
            console.error("User is not logged in or user data is missing.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/user/comments', commentData);
            console.log('Comment posted successfully:', response.data);

            // Dispatch the action to add the new comment to the Redux store
            dispatch(addComment(response.data));

            setComments(prevComments => [...prevComments, response.data]);
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };





    const sortedComments = filteredComments.sort((a, b) => {
        switch (filter) {
            case 'date':
                return new Date(b.timestamp) - new Date(a.timestamp);
            case 'rates':
                return b.rating - a.rating;
            case 'length':
                return b.comment.length - a.comment.length;
            default:
                return 0;
        }
    });

    const calculatePercentage = (star) => {
        const totalComments = comments.length;
        const starComments = comments.filter(comment => comment.rating === star).length;
        return ((starComments / totalComments) * 100).toFixed(2);
    };

    return (
        <div className="wrapper">

            <div className="comment-section">
                <div className="translation-controls">
                    <select className="translation-selection" value={language} onChange={(e) => setLanguage(e.target.value)}>
                        <option value="en">English</option>
                        <option value="zh">Chinese</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                    </select>
                    <button onClick={translatePage}>Translate</button>
                </div>

                <div className="search-container">
                    <input
                        className='search-input'
                        type="text"
                        placeholder="Search comments..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '350px', height: '40px', backgroundColor: 'white' }}
                    />

                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="date">Date</option>
                        <option value="rates">Rates</option>
                        <option value="length">Comment Length</option>
                    </select>
                    <select value={starFilter || ''} onChange={(e) => setStarFilter(Number(e.target.value))}>
                        <option value="">All Stars</option>
                        {[1, 2, 3, 4, 5].map(star => (
                            <option key={star} value={star}>
                                {star} Star - {calculatePercentage(star)}%
                            </option>
                        ))}
                    </select>
                    <select value={contentFilter} onChange={(e) => setContentFilter(e.target.value)}>
                        <option value="all">All Comments</option>
                        <option value="images">Include Images</option>
                        <option value="videos">Include Videos</option>
                        <option value="both">Include Images and Videos</option>
                    </select>
                </div>

                {/* Display the comments */}
                {/*<div className="comments-list">*/}
                {/*    {comments.map(comment => (*/}
                {/*        <div key={comment._id} className="comment-item">*/}
                {/*            <h4>{comment.title}</h4>*/}
                {/*            <p>{comment.comment}</p>*/}
                {/*            <p>{comment.rating}</p>*/}
                {/*            <p>{comment.location}</p>*/}
                {/*            <span>Rating: {comment.rating}</span>*/}
                {/*            /!* ... any other fields you want to display ... *!/*/}
                {/*        </div>*/}
                {/*    ))}*/}
                {/*</div>*/}

                <CommentForm onSubmit={handleCommentSubmit}/>
                {filteredComments.length > 0 ? (
                    <CommentList
                        comments={reviews}
                        setComments={setComments}
                        userActions={userActions}
                        setUserActions={setUserActions}
                        user={currentUser}
                        productId={productId}
                    />
                ) : (
                    <p>No results found.</p>
                )}
            </div>
        </div>
    );
}

export default CommentSection;
