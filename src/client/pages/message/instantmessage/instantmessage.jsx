import React, {useCallback, useEffect, useRef, useState} from 'react';
import './instantmessage.css';
import io from 'socket.io-client';
import Peer from 'peerjs';
import ShareLocation from "../ShareLocation/ShareLocation";
import ShareFile from "../ShareFile/ShareFile";
import {AiOutlineAudio, AiOutlinePlus, AiTwotonePhone} from "react-icons/ai";
import {LiaTelegramPlane, LiaVideoSolid} from "react-icons/lia";
import {HiMiniVideoCamera} from "react-icons/hi2";
import {MdDarkMode, MdFitScreen} from "react-icons/md";
import {FaLink} from "react-icons/fa";
import {HiLink} from "react-icons/hi";
import {CiDark} from "react-icons/ci";
import Emoji from "../Emoji";

const InstantMessage = () => {
    // State Variables
    const [showButtons, setShowButtons] = useState(false);
    const [theme, setTheme] = useState('light'); // 'light' or 'dark'
    const [messages, setMessages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentMessage, setCurrentMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [peer, setPeer] = useState(null);
    const [call, setCall] = useState(null);
    const socketRef = useRef();
    const [transcription, setTranscription] = useState(null);
    const [transcriptions, setTranscriptions] = useState({});
    //const [selectedEmoji, setSelectedEmoji] = useState(null);

    // instantmessage.jsx

    async function sendMessage(content, type) {
        try {
            const response = await fetch('http://localhost:4000/routes/messages/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: content,
                    type: type  // 'text', 'voice', 'emoji', or 'image'
                })
            });

            const data = await response.json();
            console.log("Message saved:", data);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    }

    // instantmessage.jsx

    async function fetchAllMessages() {
        try {
            const response = await fetch('http://localhost:4000/routes/messages/all');
            const messages = await response.json();
            // Update your component's state with the fetched messages
            // this.setState({ messages: messages }) or equivalent
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    }

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    // useEffect Hooks
    useEffect(() => {
        const myPeer = new Peer(undefined, {
            host: 'localhost',
            port: 4000,
        });

        myPeer.on('open', id => {
            console.log("My peer ID is: " + id);
        });

        setPeer(myPeer);

        return () => {
            myPeer.destroy();
        };
    }, []);

    useEffect(() => {
        socketRef.current = io.connect('http://localhost:4000');
        socketRef.current.on('chat message', (msg) => {
            console.log("Received message from server:", msg);
            setMessages(prevMessages => [...prevMessages, msg]);
        });
        return () => socketRef.current.off('chat message');
    }, []);

    // Functions
    const startVoiceCall = () => {
        const otherPeerId = prompt("Enter the other user's Peer ID:");
        if (otherPeerId && peer) {
            const voiceCall = peer.call(otherPeerId);
            setCall(voiceCall);
        }
    };

    const filteredMessages = messages.filter(msg => msg.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleSendMessage = useCallback((message) => {
        let messageType = 'text'; // default to text

        if (message.startsWith('data:image')) {
            messageType = 'image';
        } else if (message.startsWith('blob:')) {
            messageType = 'voice'; // assuming blobs are voice messages
        } else if (message.trim() === '') {
            return; // don't send empty messages
        }

        // TODO: Add logic for detecting emojis if needed

        console.log("Sending message to server:", message, messageType);
        socketRef.current.emit('chat message', { content: message, type: messageType });
    }, []);



    // Mock functions
    const addMessageToState = () => {
        setMessages(prev => [...prev, currentMessage]);
        setCurrentMessage('');
    };

    const startVideoCall = () => {
        alert('Starting video call... (mock function)');
    };

    const shareScreen = () => {
        alert('Sharing screen... (mock function)');
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result;
                socketRef.current.emit('chat message', base64);
                setMessages(prevMessages => [...prevMessages, base64]);
            };
            reader.readAsDataURL(file);
        }
    };

    const transcribeAudio = (audioURL) => {
        console.log("Transcribing audio:", audioURL);
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
        recognition.lang = 'zh-CN'; // You can set other languages if needed
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event) => {
            console.log("Recognition event triggered.");
            const speechToText = event.results[0][0].transcript;
            console.log("Transcription Result:", speechToText);
            setTranscriptions(prev => ({ ...prev, [audioURL]: speechToText }));
        };

        recognition.onerror = (event) => {
            console.error("Error in recognition:", event.error);
        };

        // Play the audio and recognize it
        const audio = new Audio(audioURL);
        audio.play();
        recognition.start();

        audio.onended = () => {
            console.log("Audio playback finished.");
            recognition.stop();
        };

    }

    useEffect(() => {
        console.log("Transcription updated:", transcription);
    }, [transcription]);

    return (
        <div className={`instant-message-container ${theme}`}>
            <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
            <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <div className="chat-history">
                {filteredMessages.map((msg, index) => {
                    if (msg.startsWith('data:image')) {
                        return <img key={index} src={msg} alt="Shared content" style={{ maxWidth: '200px', maxHeight: '200px' }} />;
                    } else if (msg.startsWith('blob:')) {
                        return (
                            <div key={index}>
                                <audio controls>
                                    <source src={msg} type="audio/wav" />
                                    Your browser does not support the audio element.
                                </audio>
                                <button onClick={() => transcribeAudio(msg)}>🎤 Translate to Text</button>
                                {transcriptions[msg] && <p>{transcriptions[msg]}</p>}
                            </div>
                        );
                    } else {
                        return <p key={index}>{msg}</p>;
                    }
                })}
            </div>


            <SendMessage
                key="sendMessageComponent"
                onSend={handleSendMessage}
                addMessageToState={addMessageToState}
                currentMessage={currentMessage}
                setCurrentMessage={setCurrentMessage}
                setShowButtons={setShowButtons}
                showButtons={showButtons}
                toggleTheme={toggleTheme}
                theme={theme}
                startVoiceCall={startVoiceCall}
                startVideoCall={startVideoCall}
                shareScreen={shareScreen}
            />


        </div>
    );
};

const SendMessage = React.memo(({ onSend,addMessageToState, currentMessage, setCurrentMessage, setShowButtons, showButtons, toggleTheme, theme, startVoiceCall, startVideoCall, shareScreen }) => {
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const handleEmojiClick = (emojiObject) => {
        setCurrentMessage(prevMessage => (prevMessage || "") + emojiObject.emoji);
    };

    const inputRef = useRef(null);

    const onTextChange = (e) => {
        setCurrentMessage(e.target.value);
        inputRef.current.focus();
    };

    const onMessageSubmit = (e) => {
        e.preventDefault();
        const messageType = document.getElementById('messageType').value;
        onSend(currentMessage, messageType);
        setCurrentMessage(''); // Reset the message after sending
    };



    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = event => {
            audioChunksRef.current.push(event.data);
        };
        mediaRecorderRef.current.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            onSend(audioUrl);  // Sending the audio URL. You can modify this to send the blob or save it somewhere else.
        };
        mediaRecorderRef.current.start();
        setIsRecording(true);
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };



    return (
        <div style={{backgroundColor:'#E4E6E8'}}>
            <form onSubmit={onMessageSubmit}>

                <div style={{ display: 'flex', alignItems: 'center',width:'100%',height:'50px'}}>

                    <button onClick={() => setShowButtons(!showButtons)}>
                        <AiOutlinePlus size={30} />
                    </button>

                    <select id="messageType" defaultValue="text">
                        <option value="text">Text</option>
                        <option value="voice">Voice</option>
                        <option value="emoji">Emoji</option>
                        <option value="image">Image</option>
                    </select>

                    <input
                        ref={inputRef}
                        type="text"
                        value={currentMessage}
                        onChange={onTextChange}
                        placeholder="Type your message..."
                        style={{height:'40px',margin:'3px',width:'100%'}}
                    />

                    {isRecording
                        ? <button onClick={stopRecording} type="button"><AiOutlineAudio /></button>
                        : <button onClick={startRecording} type="button"><AiOutlineAudio /></button>
                    }


                    {showButtons && (
                        <div className="button-list">
                            <div className="button-container-frist">
                                <button style={{color:'black',padding:'10px',paddingTop:'15px'}} onClick={toggleTheme}>
                                    <CiDark color='#4DA398' style={{ marginLeft: '10px' }} size={30} />
                                    <div style={{ display: 'inline-block', width: '18px' }}></div>
                                    {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
                                </button>
                            </div>
                            <div className="button-container">
                                <AiTwotonePhone color='#E94675' size={30}/>
                                <button style={{color:'black'}} onClick={startVoiceCall}>
                                    Voice Call
                                </button>
                            </div>
                            <div className="button-container">
                                <HiMiniVideoCamera color='#479CDC' size={30}/>
                                <button style={{color:'black'}} onClick={startVideoCall}>
                                    Video Call
                                </button>
                            </div>
                            <div className="button-container">
                                <MdFitScreen color='#7A6AF6' size={30}/>
                                <button style={{color:'black'}} onClick={shareScreen}>
                                    Share Screen
                                </button>
                            </div>

                            <div className="button-container">
                                <HiLink color='#F4BE54' size={30}/>
                                <button style={{color:'black'}} onClick={() => document.getElementById('fileInput').click()}>
                                    Share File
                                </button>
                            </div>

                            <ShareLocation />
                        </div>
                    )}

                    <Emoji onEmojiClick={handleEmojiClick} />

                    <button style={{height:'50px',width:'100px'}} type="submit">
                        <LiaTelegramPlane size={30} color='#657178'/>
                    </button>

                </div>

            </form>
        </div>

    );
});

export default InstantMessage
