// ReplyForm.js
import React, { useState } from 'react';

function ReplyForm({ onReply }) {
    const [reply, setReply] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onReply(reply);
        setReply('');
    };

    return (
        <div className="reply-form">
            <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Write your reply..."
            />
            <button onClick={handleSubmit}>Reply</button>
        </div>
    );
}

export default ReplyForm;
