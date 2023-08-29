import React, {useEffect, useState} from 'react';
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';  // <-- Import the UUID function

function CommentForm({ onSubmit }) {
    const [comment, setComment] = useState('');
    const [title, setTitle] = useState(''); // New title state
    const [rating, setRating] = useState(0);
    const [media, setMedia] = useState([]);
    const [location, setLocation] = useState(null);

    const date = new Date();
    const handleRating = (index) => {
        setRating(index);
    };

    const handleMediaChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setMedia(prevMedia => [...prevMedia, ...selectedFiles]);
    };


    const getCityAndCountryFromCoordinates = async (lat, lon) => {
        const response = await fetch('/api/getLocation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ lat, lon })
        });
        const data = await response.json();
        return data;
    }

    const getLocation = () => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude  = position.coords.latitude;
            const longitude = position.coords.longitude;
            const loc = await getCityAndCountryFromCoordinates(latitude, longitude);
            setLocation(loc);
        }, (error) => {
            console.error('Unable to retrieve your location');
        });
    }

// Call this function when the component mounts
    useEffect(() => {
        getLocation();
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        const date = new Date();
        const locationString = location ? `${location.city}, ${location.country} ${location.countryCode}` : 'Unknown Location';

        const images = media.filter(file => file.type.startsWith('image/'));
        const video = media.find(file => file.type.startsWith('video/'));

        onSubmit({
            comment,
            rating,
            images,
            video,
            title,
            date,
            location: locationString
        });

        setComment('');
        setTitle('');
        setMedia([]);
    };



    return (
        <div className="comment-form">
            <input
                type="text"
                placeholder="Title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment..."
            />
            <div>
                <label>Rating:</label>
                {[...Array(5)].map((_, index) => {
                    const StarIcon = index < rating ? AiFillStar : AiOutlineStar;
                    return (
                        <StarIcon
                            key={index}
                            size={30}
                            onClick={() => handleRating(index + 1)}
                            color={index < rating ? '#FFD700' : '#A9A9A9'}
                            style={{ cursor: 'pointer', margin: '0 1px' }}
                        />
                    );
                })}
            </div>

            <div>
                <label>Upload Media (Images/Video):</label>
                <input type="file" multiple onChange={handleMediaChange} accept="image/*,video/*" />
            </div>

            {}
            <div>
                {media.map((file, index) => {
                    if (file.type.startsWith('image/')) {
                        return (
                            <img key={index} src={URL.createObjectURL(file)} alt="Uploaded" style={{ width: '200px', height: '200px' }} />
                        );
                    } else if (file.type.startsWith('video/')) {
                        return (
                            <video key={index} width="200" height="200" controls>
                                <source src={URL.createObjectURL(file)} type={file.type} />
                                Your browser does not support the video tag.
                            </video>
                        );
                    }
                    return null;
                })}
            </div>


            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default CommentForm;
