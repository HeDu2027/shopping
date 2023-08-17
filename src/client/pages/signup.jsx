// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {FcGoogle} from "react-icons/fc";
// import {BsApple, BsFacebook, BsMessenger, BsReddit, BsTencentQq} from "react-icons/bs";
// import {FaInstagramSquare, FaLine, FaTelegram, FaTiktok} from "react-icons/fa";
// import {GrSkype, GrTwitter} from "react-icons/gr";
// import {IoLogoWechat} from "react-icons/io5";
// import {ImWhatsapp} from "react-icons/im"; // Add this line
// import { GoogleLogin } from 'react-google-login';
//
// function Signup() {
//     const [usernameError, setUsernameError] = useState(null);
//     const [passwordError, setPasswordError] = useState(null);
//     const [confirmPasswordError, setConfirmPasswordError] = useState(null);
//
//     const navigate = useNavigate();
//     const [form, setForm] = useState({
//         username: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//     });
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//
//     const handleChange = (e) => {
//         if (e.target.name === 'username' && /\d/.test(e.target.value)) {
//             setUsernameError('Username should not contain any digits');
//         } else {
//             setUsernameError(null);
//         }
//
//         if (e.target.name === 'password' && !/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,}$/.test(e.target.value)) {
//             setPasswordError('Password should contain at least one digit, one letter, one special character, and be at least 8 characters long');
//         } else {
//             setPasswordError(null);
//         }
//
//         if (e.target.name === 'confirmPassword' && e.target.value !== form.password) {
//             setConfirmPasswordError('Passwords do not match');
//         } else {
//             setConfirmPasswordError(null);
//         }
//
//         setForm({
//             ...form,
//             [e.target.name]: e.target.value,
//         });
//     };
//
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//
//         // Check if the username contains any digits
//         if (/\d/.test(form.username)) {
//             setError('Username should not contain any digits');
//             return;
//         }
//
//         // Check if the password contains at least one digit, one letter, and one special character
//         if (!/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,}$/.test(form.password)) {
//             setError('Password should contain at least one digit, one letter, one special character, and be at least 8 characters long');
//             return;
//         }
//
//         // Check if passwords match
//         if (form.password !== form.confirmPassword) {
//             setError('Passwords do not match');
//             return;
//         }
//
//         setLoading(true);
//         setError(null);
//
//         // Perform signup request
//         try {
//             const response = await fetch('http://localhost:4000/routes/auth/api/signup', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(form),
//             });
//             const data = await response.json();
//             if (!response.ok) {
//                 throw new Error(data.error);
//             }
//             // Registration successful
//             setLoading(false);
//             alert('Registration successful!');
//             navigate('/login');
//         } catch (err) {
//             setError(err.message);
//             setLoading(false);
//         }
//     };
//
//     const responseGoogle = (response) => {
//         console.log(response);
//         // 你可以在这里处理Google登录的响应，例如将返回的令牌发送到你的后端服务器
//     }
//
//     return (
//         <div style={styles.outerContainer}>
//             <div style={styles.container}>
//                 <form onSubmit={handleSubmit} style={styles.form}>
//                     <h1 style={{ color: '#00AFF0' }}>Sign Up</h1>
//                     {error && <p>{error}</p>}
//                     <input
//                         type="text"
//                         name="username"
//                         placeholder="Username"
//                         value={form.username}
//                         onChange={handleChange}
//                         required
//                         style={styles.input}
//                     />
//                     {usernameError && <p style={{ color: 'red' }}>{usernameError}</p>}
//                     <input
//                         type="email"
//                         name="email"
//                         placeholder="Email"
//                         value={form.email}
//                         onChange={handleChange}
//                         required
//                         style={styles.input}
//                     />
//                     <input
//                         type="password"
//                         name="password"
//                         placeholder="Password"
//                         value={form.password}
//                         onChange={handleChange}
//                         required
//                         style={styles.input}
//                     />
//                     {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
//                     <input
//                         type="password"
//                         name="confirmPassword"
//                         placeholder="Confirm Password"
//                         value={form.confirmPassword}
//                         onChange={handleChange}
//                         required
//                         style={styles.input}
//                     />
//                     {confirmPasswordError && <p style={{ color: 'red' }}>{confirmPasswordError}</p>}
//                     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', height: 'calc(2 * 36px + 18px + 30px + 30px)' }}>
//                         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                             <button type="submit" disabled={loading} style={{ ...styles.button, marginRight: '30px' }}>
//                                 {loading ? 'Loading...' : 'Sign Up'}
//                             </button>
//                             <button type="button" style={styles.button} onClick={() => navigate('/login')}>
//                                 Login
//                             </button>
//                         </div>
//                         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                             <button type="button" style={{ ...styles.button, marginRight: '30px' }} onClick={() => navigate('/login-by-email')}>
//                                 Login by email
//                             </button>
//                             <button type="button" style={styles.button} onClick={() => navigate('/login-by-sms')}>
//                                 Login by mobile SMS
//                             </button>
//                         </div>
//                         <div style={{ height: '30px' }}></div>
//                         <div style={{display: 'flex', justifyContent: 'space-between', width: '850px'}}>
//                             <GoogleLogin
//                                 clientId="997666871317-gfrm9malcq0bb05mp8osn9oscn99v4m6.apps.googleusercontent.com"
//                                 onSuccess={responseGoogle}
//                                 onFailure={responseGoogle}
//                                 cookiePolicy={'single_host_origin'}
//                                 render={renderProps => (
//                                     <FcGoogle size={45} onClick={renderProps.onClick} disabled={renderProps.disabled} />
//                                 )}
//                             />
//                             <BsFacebook size={45} color='#3B5998' />
//                             <BsApple size={45} color='#000000' />
//                             <GrTwitter size={45} color='#1DA1F2' />
//                             <FaInstagramSquare size={45} color='#E4405F' />
//                             <BsReddit size={45} color='#FF4500' />
//                             <FaTelegram size={45} color='#0088cc' />
//                             <IoLogoWechat size={45} color='#7BB32E' />
//                             <BsTencentQq size={45} color='#12B7F5' />
//                             <GrSkype size={45} color='#00AFF0' />
//                             <FaLine size={45} color='#00C300' />
//                             <ImWhatsapp size={45} color='#25D366' />
//                             <BsMessenger size={45} color='#0084FF' />
//                             <FaTiktok size={45} color='#000000' />
//                         </div>
//                         <div style={{ height: '30px' }}></div>
//                         <p>
//                             By signing up, you agree to our <a href="/terms">Terms</a> and have read
//                             our <a href="/privacy">Privacy Policy</a>.
//                         </p>
//                     </div>
//
//                 </form>
//             </div>
//         </div>
//     );
// }
//
// const styles = {
//     outerContainer: {
//         display: 'flex',
//         justifyContent: 'center',
//         width: '100%', // ensure it takes up full width
//     },
//     container: {
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         //height: '100vh', // Add this line
//     },
//     form: {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//     },
//     input: {
//         width: 260,
//         height: 40,
//         margin: 15,
//         borderRadius:5
//     },
//     button: {
//         width: 170,
//         height: 40,
//         margin: 15,
//         backgroundColor: '#00AFF0',
//         border: 'none',
//         color: 'white',
//         cursor: 'pointer',
//         borderRadius:5
//     },
// };
//
// export default Signup;
