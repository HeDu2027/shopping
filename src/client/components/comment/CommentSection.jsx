import React, { useState } from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import './style.css';

function CommentSection() {
    const [comments, setComments] = useState([
        {
            id: 1,
            userAvatar: 'path_to_avatar',
            userName: 'John',
            rating: 5,
            comment: 'Great product!',
            replies: [],
            likes: 0,
            dislikes: 0
        }
    ]);
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
                    body: JSON.stringify({ text: comment.comment, targetLanguage: language })
                });
                const data = await response.json();
                return { ...comment, comment: data.translations[0] };
            }));
            setComments(translated);
        } catch (error) {
            console.error("Translation failed:", error);
        }
    };

    const filteredComments = comments.filter(comment =>
        comment.comment.toLowerCase().includes(searchTerm.toLowerCase())
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

    const handleReply = (commentId, newReply) => {
        const updatedComments = comments.map(comment => {
            if (comment.id === commentId) {
                return {
                    ...comment,
                    replies: [...(comment.replies || []), newReply]
                };
            }
            return comment;
        });
        setComments(updatedComments);
    };

    const handleCommentSubmit = (newComment) => {
        setComments([...comments, newComment]);
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
        <div className="comment-section">
            <div className="translation-controls">
                <select value={language} onChange={(e) => setLanguage(e.target.value)}>
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
                    type="text"
                    placeholder="Search comments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
            <CommentForm onSubmit={handleCommentSubmit} />
            {filteredComments.length > 0 ? (
                <CommentList
                    comments={filteredComments}
                    setComments={setComments}
                    userActions={userActions}
                    setUserActions={setUserActions}
                />
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
}

export default CommentSection;
