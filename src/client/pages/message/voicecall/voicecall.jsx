import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import Peer from 'peerjs';

const VoiceCall = () => {
    const socketRef = useRef();
    const peerRef = useRef();
    const myAudioRef = useRef();

    const initializePeer = () => {
        peerRef.current = new Peer(undefined, {
            host: 'localhost',
            port: 9000,
            path: '/'
        });

        peerRef.current.on('open', (id) => {
            console.log('PeerJS connected with ID:', id);
            socketRef.current.emit('join-room', id);
        });

        peerRef.current.on('call', call => {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    call.answer(stream);
                    call.on('stream', remoteStream => {
                        myAudioRef.current.srcObject = remoteStream;
                        myAudioRef.current.play();
                    });
                })
                .catch(err => {
                    console.error('Failed to get local stream', err);
                });
        });

        peerRef.current.on('error', (err) => {
            console.error('PeerJS error:', err);
            if (err.type === 'disconnected') {
                initializePeer();  // Reinitialize and reattach event listeners
            }
        });
    };

    useEffect(() => {
        socketRef.current = io.connect('http://localhost:4000');
        initializePeer();

        socketRef.current.on('voice-call-started', (data) => {
            // Handle when a voice call starts
        });

        socketRef.current.on('voice-call-ended', (data) => {
            // Handle when a voice call ends
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    const startVoiceCall = () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const call = peerRef.current.call('temp_user2', stream);
                if (call) {
                    call.on('stream', remoteStream => {
                        myAudioRef.current.srcObject = remoteStream;
                        myAudioRef.current.play();
                    });
                    call.on('error', err => {
                        console.error('Error with the call:', err);
                    });
                } else {
                    console.error('Failed to initiate call. Call object is undefined.');
                }
            })
            .catch(err => {
                console.error('Failed to get local stream', err);
            });
    };

    const endVoiceCall = () => {
        // Generate temporary IDs for the participants (use the same logic as startVoiceCall)
        const tempCallId = `call_${Date.now()}`;
        const tempParticipants = ['temp_user1', 'temp_user2'];

        // Emit the end-voice-call event with the temporary data
        socketRef.current.emit('end-voice-call', {
            callId: tempCallId,
            participants: tempParticipants
        });
    };

    return (
        <div>
            <h2>Voice Call</h2>
            <button onClick={startVoiceCall}>Start Call</button>
            <button onClick={endVoiceCall}>End Call</button>
            <audio ref={myAudioRef} controls></audio>
        </div>
    );
};

export default VoiceCall;
