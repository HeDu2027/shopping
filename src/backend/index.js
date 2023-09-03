require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { ExpressPeerServer } = require('peer');
const connectDB = require('./config/db');
const Location = require('./models/Location');
const VideoCall = require('./models/VideoCall');
const Message=require('./models/msg')
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCk--_LYH_VdruwAgECq5HxYbPaZ2ymZew',
    Promise: Promise
});

// Routes
const authRoutes = require('./routes/auth');
const emailVerifyRoutes = require('./routes/emailVerify');
const addressRoutes = require('./routes/address');
const cardRoutes = require('./routes/card');
const paypalRoutes = require('./routes/paypal');
const googleRoutes = require('./routes/google');
const leaveMessageRoutes = require('./routes/leaveMessageRoutes');
const messageRoutes = require('./routes/messageRoutes');
const voiceCallRoutes = require('./routes/voiceCallRoutes');
const locationRoutes = require('./routes/locationRoutes');
const fileRoutes = require('./routes/fileRoutes');
const videoCallRoutes = require('./routes/videoCallRoutes');
const screenShareRoutes = require('./routes/screenShareRoutes');
const translationRoutes=require('./routes/transalation')
const placeRoutes=require('./routes/place')
const favoriteRoutes = require('./routes/favorites'); // Assuming the file name is favorites.js
const updatefileRoutes=require('./routes/updateuser')
// const userRoutes = require('./routes/userRoutes');

const PersonalCenterRoutes=require('./routes/PersonalCenterRoutes')
const productRoutes = require('./routes/product');

const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});


const peerServer = ExpressPeerServer(server, {
    debug: true,
    path: '/peerjs',
});

app.use('/peerjs', peerServer);

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use('/uploads', express.static('uploads'));

// Use routes
app.use('/routes/auth', authRoutes);
app.use('/routes/emailverify', emailVerifyRoutes);
app.use('/address', addressRoutes);
app.use('/card', cardRoutes);
app.use('/routes/paypal', paypalRoutes);
app.use('/routes/google', googleRoutes);
app.use('/routes/leave-message', leaveMessageRoutes);
app.use('/routes/messages', messageRoutes);
app.use('/routes/voicecall', voiceCallRoutes);
app.use('/location', locationRoutes);
app.use('/', fileRoutes);
app.use('/video-call', videoCallRoutes);
//app.use('/messages', messageRoutes);
app.use('/screen-share', screenShareRoutes);
app.use('/routes',translationRoutes);
app.use('/api',placeRoutes)
app.use(favoriteRoutes);
app.use('/user',updatefileRoutes)

app.use('/user',PersonalCenterRoutes)


app.use('/productcontainer/images', express.static(path.join('/Users/hedu/Desktop/shopping/src/client/data', 'image')));
app.use('/product', productRoutes); // Use product routes
// app.use('/api', userRoutes);
io.on('connection', (socket) => {
    //console.log('a user connected');

    socket.on('chat message', async (messageObj) => {
        console.log(`Received message from socket ${socket.id}:`, messageObj.content);

        // Validate the message type
        if (!['text', 'voice', 'emoji', 'image'].includes(messageObj.type)) {
            console.error("Invalid message type:", messageObj.type);
            return;
        }


        // Save the message to MongoDB
        const newMessage = new Message({
            content: messageObj.content,
            type: messageObj.type
        });

        try {
            await newMessage.save();
            console.log(`Message saved to MongoDB. Content: "${messageObj.content}"`);
        } catch (error) {
            console.error("Error saving message to MongoDB:", error);
        }

        // Broadcast the message to all connected clients
        io.emit('chat message', messageObj.content);
    });

    socket.on('join-room', (roomId) => {
        socket.join(roomId);
    });

    // Assuming you have a database setup or an in-memory store

    //console.log('a user connected', socket.id);

    // socket.on('start-voice-call', (data) => {
    //     console.log("Voice call started:", data);
    //
    //     // Store the call data (for demonstration purposes, we're using an in-memory store)
    //     const { callId, participants } = data;
    //     if (callId && participants) {
    //         activeCalls[callId] = {
    //             participants,
    //             startTime: new Date()
    //         };
    //
    //         // Notify other participants about the call start
    //         participants.forEach(participant => {
    //             if (participant !== socket.id) {
    //                 socket.to(participant).emit('voice-call-start-notification', { callId, initiator: socket.id });
    //             }
    //         });
    //     } else {
    //         console.error("Invalid call data received:", data);
    //     }
    // });

    // socket.on('end-voice-call', (data) => {
    //     console.log("Voice call ended:", data);
    //
    //     // Remove the call data from the store
    //     const { callId } = data;
    //     if (callId && activeCalls[callId]) {
    //         const { participants } = activeCalls[callId];
    //
    //         // Notify other participants about the call end
    //         participants.forEach(participant => {
    //             if (participant !== socket.id) {
    //                 socket.to(participant).emit('voice-call-end-notification', { callId, ender: socket.id });
    //             }
    //         });
    //
    //         delete activeCalls[callId];
    //     } else {
    //         console.error("Invalid call data or call not found:", data);
    //     }
    // });

    socket.on('share-screen', (roomId, streamId) => {
        console.log("Received share-screen event for room:", roomId, "with streamId:", streamId);
        socket.to(roomId).emit('screen-shared', streamId);
    });


    socket.on('share-location', async (location) => {
        try {
            const { latitude, longitude } = location;
            const response = await googleMapsClient.reverseGeocode({
                latlng: [latitude, longitude]
            }).asPromise();
            //console.log("Google Maps API Response:", response.json.results);

            const results = response.json.results;
            if (results && results.length > 0) {
                const addressComponents = results[0].address_components;
                const country = addressComponents.find(comp => comp.types.includes("country"))?.long_name;
                const state = addressComponents.find(comp => comp.types.includes("administrative_area_level_1"))?.long_name;
                const city = addressComponents.find(comp => comp.types.includes("locality"))?.long_name || addressComponents.find(comp => comp.types.includes("administrative_area_level_2"))?.long_name;
                const postcode = addressComponents.find(comp => comp.types.includes("postal_code"))?.long_name;

                const structuredLocation = {
                    country,
                    state,
                    city,
                    postcode
                };
                console.log("Emitting structured location:", structuredLocation);

                const newLocation = new Location({ latitude, longitude, placeName: results[0].formatted_address });
                await newLocation.save();
                io.emit('receive-location', structuredLocation);  // Change this line
            }
        } catch (err) {
            console.log(err);
        }
    });

    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });

    app.use('/uploads', express.static('uploads'));


    // socket.on('receive-location', (location) => {
    //     console.log("Received location:", location);
    //     setReceivedLocation(location);
    // });

    socket.on('disconnect', () => {
           // console.log('user disconnected');
        });
    });

app.use('/screen-share', screenShareRoutes); // Use the new routes
    server.listen(4000, () => console.log('Server listening on port 4000'));

