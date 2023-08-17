// import React, { useState } from 'react';
// import {AiOutlinePlus} from "react-icons/ai";
//
// const SendMessage = ({ onSend }) => {
//     const [message, setMessage] = useState('');
//     const onTextChange = (e) => {
//         setMessage(e.target.value);
//     };
//
//     const onMessageSubmit = (e) => {
//         e.preventDefault();
//         console.log("Sending message:", message); // Add this line
//         onSend(message);
//         setMessage('');
//     };
//
//     return (
//         <form onSubmit={onMessageSubmit}>
//             <input
//                 type="text"
//                 value={message}
//                 onChange={onTextChange}
//                 placeholder="Type your message..."
//             />
//
//             <button type="submit">Send</button>
//         </form>
//     );
// };
//
// export default SendMessage;
