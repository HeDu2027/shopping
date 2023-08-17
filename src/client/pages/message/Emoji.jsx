// Emoji.jsx
import React, { useState } from 'react';
import Picker from 'emoji-picker-react';

const Emoji = ({ onEmojiClick }) => {
    const [showPicker, setShowPicker] = useState(false);

    const handleEmojiClick = (emojiObject) => {
        console.log("Emoji Object:", emojiObject);
        onEmojiClick(emojiObject);
        setShowPicker(false);
    };

    return (
        <div>
            <button onClick={() => setShowPicker(!showPicker)}>🙂</button>
            {showPicker &&
                <div style={{ width: '80%', height: '300px', overflow: 'auto' }}>
                    <Picker onEmojiClick={(emoji, event) => handleEmojiClick(emoji)} />
                </div>
            }
        </div>
    );
};

export default Emoji;
