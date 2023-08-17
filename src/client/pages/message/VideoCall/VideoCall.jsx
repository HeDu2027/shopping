import React, { useRef, useState, useEffect } from 'react';
import io from 'socket.io-client';
import Peer from 'peerjs';
import { v4 as uuidv4 } from 'uuid';


const socket = io.connect('http://localhost:4000');

const VideoCall = () => {
    const [myId, setMyId] = useState('');
    const [stream, setStream] = useState();
    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();
    const [ongoingCallId, setOngoingCallId] = useState(null);  // Add this line to store the ongoing call's ID
    const generateUniqueCallId = () => {
        return uuidv4();
    };

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
            setStream(currentStream);
            if (myVideo.current) {
                myVideo.current.srcObject = currentStream;
            }
        });

        socket.on('me', (id) => setMyId(id));

        socket.on('callUser', ({ from, name: callerName, signal }) => {
            console.log("Received callUser event from socket");
            const call = peer.call(from, stream);
            call.on('stream', (userVideoStream) => {
                if (userVideo.current) {
                    userVideo.current.srcObject = userVideoStream;
                }
            });
            call.on('close', () => {
                userVideo.current.srcObject.getTracks().forEach(track => track.stop());
            });

            call.on('error', (err) => {
                console.error("Error during call:", err);
            });

            connectionRef.current = call;
        });
    }, [stream]);

    const peer = new Peer(undefined, {
        host: 'localhost',
        port: '4000',
        path: '/peerjs'
    });




    peer.on('open', id => {
        console.log("PeerJS connection established with ID:", id);
        setMyId(id);
    });

    const startCall = () => {
        console.log("Start Call button clicked");

        // Generate a unique callId (you can use a library like uuid for this)
        const callId = generateUniqueCallId();  // Implement this function or use a library

        setOngoingCallId(callId);  // Store the callId in the state

        socket.emit('start-call', { callId: callId, users: [myId] });  // Emitting start-call event
    };

    const endCall = () => {
        console.log("End Call button clicked");

        if (ongoingCallId) {
            socket.emit('end-call', { callId: ongoingCallId });  // Emitting end-call event using the stored callId
        }

        if (connectionRef.current) {
            connectionRef.current.close();
        }
    };


    return (
        <div>
            <h1>Video Call</h1>
            <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />
            <video playsInline ref={userVideo} autoPlay style={{ width: "300px" }} />
            <div>
                <button onClick={startCall}>Start Call</button>
                <button onClick={endCall}>End Call</button>
            </div>
        </div>
    );
};

export default VideoCall;
