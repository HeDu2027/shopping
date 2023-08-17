import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import {IoLocationSharp} from "react-icons/io5";

const socket = io.connect('http://localhost:4000');

const ShareLocation = () => {
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [place, setPlace] = useState({
        country: null,
        state: null,
        city: null,
        postcode: null
    });

    useEffect(() => {
        console.log("Setting up socket listener for 'receive-location' event...");

        socket.on('receive-location', (data) => {
            console.log("Received location data from backend:", data);
            setPlace(data);
        });

        return () => {
            console.log("Cleaning up socket listener for 'receive-location' event...");
            socket.off('receive-location');
        };
    }, []);

    const shareMyLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });
                socket.emit('share-location', { latitude, longitude });
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    return (
        <div>

            <div style={{
                backgroundColor:'whitesmoke',
                borderBottomRightRadius:'15px',
                borderBottomLeftRadius:'15px',
            }}>
                <button onClick={shareMyLocation} style={{color:'#367BF3',display:'flex'}}>
                    <IoLocationSharp  size={30}/>
                    <p style={{color:'black',padding:'4px',marginLeft:'15px'}}>Share Location</p>
                </button>
            </div>

            {location.latitude && (
                <div>
                    <p>Latitude: {location.latitude}</p>
                    <p>Longitude: {location.longitude}</p>
                </div>
            )}
            {place.city && (
                <div>
                    <p>Country: {place.country}</p>
                    <p>State: {place.state}</p>
                    <p>City: {place.city}</p>
                    <p>Postcode: {place.postcode}</p>
                </div>
            )}
        </div>
    );
};

export default ShareLocation;
