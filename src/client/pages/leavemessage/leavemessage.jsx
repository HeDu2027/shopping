import React, { useState } from 'react';
import { readAndCompressImage } from 'browser-image-resizer';
import {imageConfig}  from './image-config';
import axios from "axios";
const LeaveMessage = () => {
    const [message, setMessage] = useState('');
    const [type, setType] = useState('Feedback');
    const [image, setImage] = useState(null);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file && file.size > 10 * 1024 * 1024) {
            alert('File is too large. It will be compressed.');
            const compressedImage = await readAndCompressImage(file, imageConfig);
            setImage(compressedImage);
        } else {
            setImage(file);
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('message', message);
        formData.append('type', type);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axios.post('/routes/leave-message/submit', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });


            if (response.status === 200) {
                alert('Message submitted successfully!');
                setMessage(''); // Clear the message after submission
                setImage(null); // Clear the image after submission
            } else {
                alert('Error submitting the message. Please try again.');
            }
        } catch (error) {
            alert('Error submitting the message: ' + error.message);
        }
    };


    return (
        <div className="leave-message-container">
            <h2>Leave a Message</h2>

            <label>Select Message Type:</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="Feedback">Feedback</option>
                <option value="Support Request">Support Request</option>
                <option value="Product Inquiry">Product Inquiry</option>
                <option value="Booking Request">Booking Request</option>
                <option value="Feature Request">Feature Request</option>
                <option value="Bug Report">Bug Report</option>
                <option value="Order Query">Order Query</option>
                <option value="Subscription Inquiry">Subscription Inquiry</option>
                {/* Add more options as needed */}
            </select>

            <textarea
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            ></textarea>

            <label>Upload Image:</label>
            <input type="file" onChange={handleImageChange} accept="image/*" />

            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default LeaveMessage;
