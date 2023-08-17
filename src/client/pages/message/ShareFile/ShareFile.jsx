import React, { useState } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000');

const ShareFile = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const onFileUpload = () => {
        console.log("Attempting to upload file...");
        if (!file) {
            console.error("No file selected");
            setMessage("Please select a file before sharing.");
            return;
        }
        const formData = new FormData();
        formData.append('file', file);

        fetch('http://localhost:4000/upload', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                console.log("Received response from server:", response.status, response.statusText);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log("File uploaded successfully:", data);
                setMessage('File uploaded successfully.');
            })
            .catch(error => {
                console.error('Error uploading file:', error);
                setMessage('Error uploading the file.');
            });

    };

    return (
        <div>
            <input type="file" onChange={onFileChange} />
            <button onClick={onFileUpload}>Share File</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ShareFile;
