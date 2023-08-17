import React, {useEffect, useRef, useState} from 'react';
import io from 'socket.io-client';
import Peer from 'peerjs';

const socket = io.connect('http://localhost:4000');
const ShareScreen = ({ roomId }) => {
    const screenVideoRef = useRef();
    const [peer, setPeer] = useState(null);

    const getTargetPeerId = async () => {
        try {
            const response = await fetch("/api/getPeerId");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data.peerId;
        } catch (error) {
            console.error("Failed to fetch Peer ID:", error);
            return null;  // or handle this error appropriately
        }
    };


    useEffect(() => {
        const myPeer = new Peer(undefined, {
            host: 'localhost',
            port: '5000',
            path: '/peerjs'
        });
        setPeer(myPeer);

        return () => {
            if (myPeer) {
                myPeer.destroy();
            }
        };
    }, []);



    useEffect(() => {
        console.log("Joining room:", roomId);
        socket.emit('join-room', roomId);

        socket.on('screen-shared', (streamId) => {
            console.log("Received screen-shared event with streamId:", streamId);
            const screenStream = peer.call(streamId);
            screenStream.on('stream', (stream) => {
                if (screenVideoRef.current) {
                    screenVideoRef.current.srcObject = stream;
                }
            });
        });
    }, [roomId]);


    const startScreenShare = async () => {
        console.log("Attempting to start screen sharing...");
        try {
            const screenStream = await navigator.mediaDevices.getDisplayMedia();
            console.log("Screen stream acquired:", screenStream);

            if (!peer) {
                console.error("Peer object is not initialized.");
                return;
            }

            const targetPeerId = await getTargetPeerId();
            const screenCall = peer.call(targetPeerId, screenStream);
            console.log("Screen call initiated with peer:", screenCall.peer);
            socket.emit('share-screen', roomId, screenCall.peer);
        } catch (error) {
            console.error("Error during screen sharing:", error);
        }
    };


    return (
        <div>
            <button onClick={startScreenShare}>Share Screen</button>
            <video ref={screenVideoRef} autoPlay playsInline />
        </div>
    );
};

export default ShareScreen;
