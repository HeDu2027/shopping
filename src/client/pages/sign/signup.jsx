import React, { useState } from 'react';
import {BsApple, BsFacebook, BsMessenger, BsReddit, BsTencentQq} from "react-icons/bs";
import {GrSkype, GrTwitter} from "react-icons/gr";
import {FaInstagramSquare, FaLine, FaTelegram, FaTiktok} from "react-icons/fa";
import {IoLogoWechat} from "react-icons/io5";
import {ImWhatsapp} from "react-icons/im";
import {useNavigate} from "react-router-dom";
import './Sign.css'

import { useDispatch, useSelector } from 'react-redux';
import { userSignUpRequest, userSignUpSuccess, userSignUpFailure } from '../../redux/actions/userActions';

// Inside your Sign component, replace the useState for loading and error:

function Signup() {
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.user);

    const [usernameError, setUsernameError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState(null);

    const navigate = useNavigate();
    const [form, setForm] = useState({
        // Personal Information
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        profileImage: '',

        // Contact Information
        address: {
            street: '',
            city: '',
            state: '',
            postalCode: '',
            country: ''
        },
        alternateEmail: '',
        alternatePhone: '',

        // Account Information
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: '',

        // Preferences and Settings
        language: '',
        currency: '',
        theme: 'Light',

        socialAccounts: {
            facebook: '',
            twitter: '',
            instagram: '',
            linkedin: ''
        },

        // Security
        securityQuestions: [
            {
                question: '',
                answer: ''
            }
        ],
    });
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);

    const handleChange = (e) => {
        if (e.target.name === 'username' && /\d/.test(e.target.value)) {
            setUsernameError('Username should not contain any digits');
        } else {
            setUsernameError(null);
        }

        // if (e.target.name === 'password' && !/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,}$/.test(e.target.value)) {
        //     setPasswordError('Password should contain at least one digit, one letter, one special character, and be at least 8 characters long');
        // } else {
        //     setPasswordError(null);
        // }

        if (e.target.name === 'confirmPassword' && e.target.value !== form.password) {
            setConfirmPasswordError('Passwords do not match');
        } else {
            setConfirmPasswordError(null);
        }

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if the username contains any digits
        if (/\d/.test(form.username)) {
            dispatch(userSignUpFailure('Username should not contain any digits'));
            return;
        }

        // Check if the password contains at least one digit, one letter, and one special character
        // if (!/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,}$/.test(form.password)) {
        //     dispatch(userSignUpFailure('Password should contain at least one digit, one letter, one special character, and be at least 8 characters long'));
        //     return;
        // }

        // Check if passwords match
        if (form.password !== form.confirmPassword) {
            dispatch(userSignUpFailure('Passwords do not match'));
            return;
        }

        dispatch(userSignUpRequest());

        try {
            const response = await fetch('http://localhost:4000/routes/auth/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error);
            }
            dispatch(userSignUpSuccess(data));
            alert('Registration successful!');
            navigate('/login');
        } catch (err) {
            dispatch(userSignUpFailure(err.message));
        }
    };


    return (
        <div style={styles.outerContainer}>
            <div style={styles.container}>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <h1 style={{ color: '#00AFF0' }}>Sign Up</h1>
                    {error && <p>{error}</p>}

                    {/* Personal Information */}
                    <h2>Personal Information</h2>
                    <input type="text" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} style={styles.input} />
                    <input type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} style={styles.input} />
                    <input type="date" name="dateOfBirth" placeholder="Date of Birth" value={form.dateOfBirth} onChange={handleChange} style={styles.input} />
                    <select name="gender" value={form.gender} onChange={handleChange} style={styles.input}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>

                    {/* Contact Information */}
                    <h2>Contact Information</h2>
                    <input type="text" name="address.street" placeholder="Street" value={form.address.street} onChange={handleChange} style={styles.input} />
                    <input type="text" name="address.city" placeholder="City" value={form.address.city} onChange={handleChange} style={styles.input} />
                    <input type="text" name="address.state" placeholder="State" value={form.address.state} onChange={handleChange} style={styles.input} />
                    <input type="text" name="address.postalCode" placeholder="Postal Code" value={form.address.postalCode} onChange={handleChange} style={styles.input} />
                    <input type="text" name="address.country" placeholder="Country" value={form.address.country} onChange={handleChange} style={styles.input} />

                    {/* Account Information */}
                    <h2>Account Information</h2>
                    <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required style={styles.input} />
                    <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required style={styles.input} />
                    <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required style={styles.input} />
                    <input type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required style={styles.input} />

                    {/* Preferences and Settings */}
                    <h2>Preferences and Settings</h2>
                    <input type="text" name="language" placeholder="Preferred Language" value={form.language} onChange={handleChange} style={styles.input} />
                    <input type="text" name="currency" placeholder="Preferred Currency" value={form.currency} onChange={handleChange} style={styles.input} />
                    <select name="theme" value={form.theme} onChange={handleChange} style={styles.input}>
                        <option value="Light">Light Theme</option>
                        <option value="Dark">Dark Theme</option>
                    </select>

                    <h2>Social Media and External Accounts</h2>
                    <input type="text" name="socialAccounts.facebook" placeholder="Facebook Profile URL" value={form.socialAccounts.facebook} onChange={handleChange} style={styles.input} />
                    <input type="text" name="socialAccounts.twitter" placeholder="Twitter Profile URL" value={form.socialAccounts.twitter} onChange={handleChange} style={styles.input} />
                    <input type="text" name="socialAccounts.instagram" placeholder="Instagram Profile URL" value={form.socialAccounts.instagram} onChange={handleChange} style={styles.input} />
                    <input type="text" name="socialAccounts.linkedin" placeholder="LinkedIn Profile URL" value={form.socialAccounts.linkedin} onChange={handleChange} style={styles.input} />

                    {/* Security Questions */}
                    <h2>Security Questions</h2>
                    <input type="text" name="securityQuestions[0].question" placeholder="Security Question" value={form.securityQuestions[0].question} onChange={handleChange} style={styles.input} />
                    <input type="text" name="securityQuestions[0].answer" placeholder="Answer" value={form.securityQuestions[0].answer} onChange={handleChange} style={styles.input} />

                    {/*<input*/}
                    {/*    type="text"*/}
                    {/*    name="username"*/}
                    {/*    placeholder="Username"*/}
                    {/*    value={form.username}*/}
                    {/*    onChange={handleChange}*/}
                    {/*    required*/}
                    {/*    style={styles.input}*/}
                    {/*/>*/}
                    {/*{usernameError && <p style={{ color: 'red' }}>{usernameError}</p>}*/}
                    {/*<input*/}
                    {/*    type="email"*/}
                    {/*    name="email"*/}
                    {/*    placeholder="Email"*/}
                    {/*    value={form.email}*/}
                    {/*    onChange={handleChange}*/}
                    {/*    required*/}
                    {/*    style={styles.input}*/}
                    {/*/>*/}
                    {/*<input*/}
                    {/*    type="password"*/}
                    {/*    name="password"*/}
                    {/*    placeholder="Password"*/}
                    {/*    value={form.password}*/}
                    {/*    onChange={handleChange}*/}
                    {/*    required*/}
                    {/*    style={styles.input}*/}
                    {/*/>*/}
                    {/*{passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}*/}
                    {/*<input*/}
                    {/*    type="password"*/}
                    {/*    name="confirmPassword"*/}
                    {/*    placeholder="Confirm Password"*/}
                    {/*    value={form.confirmPassword}*/}
                    {/*    onChange={handleChange}*/}
                    {/*    required*/}
                    {/*    style={styles.input}*/}
                    {/*/>*/}
                    {confirmPasswordError && <p style={{ color: 'red' }}>{confirmPasswordError}</p>}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', height: 'calc(2 * 36px + 18px + 30px + 30px)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button type="submit" disabled={loading} style={{ ...styles.button, marginRight: '30px' }}>
                                {loading ? 'Loading...' : 'Sign Up'}
                            </button>
                            <button type="button" style={styles.button} onClick={() => navigate('/login')}>
                                Login
                            </button>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button type="button" style={{ ...styles.button, marginRight: '30px' }} onClick={() => navigate('/login-by-email')}>
                                Login by email
                            </button>
                            <button type="button" style={styles.button} onClick={() => navigate('/login-by-sms')}>
                                Login by mobile SMS
                            </button>
                        </div>
                        <div style={{ height: '30px' }}></div>
                        <div style={{display: 'flex', justifyContent: 'space-between', width: '850px'}}>

                            <BsFacebook size={45} color='#3B5998' />
                            <BsApple size={45} color='#000000' />
                            <GrTwitter size={45} color='#1DA1F2' />
                            <FaInstagramSquare size={45} color='#E4405F' />
                            <BsReddit size={45} color='#FF4500' />
                            <FaTelegram size={45} color='#0088cc' />
                            <IoLogoWechat size={45} color='#7BB32E' />
                            <BsTencentQq size={45} color='#12B7F5' />
                            <GrSkype size={45} color='#00AFF0' />
                            <FaLine size={45} color='#00C300' />
                            <ImWhatsapp size={45} color='#25D366' />
                            <BsMessenger size={45} color='#0084FF' />
                            <FaTiktok size={45} color='#000000' />
                        </div>
                        <div style={{ height: '30px' }}></div>
                        <p>
                            By signing up, you agree to our <a href="/terms">Terms</a> and have read
                            our <a href="/privacy">Privacy Policy</a>.
                        </p>
                    </div>

                </form>
            </div>
        </div>
    );
}

const styles = {
    outerContainer: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%', // ensure it takes up full width
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        //height: '100vh', // Add this line
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    input: {
        width: 260,
        height: 40,
        margin: 15,
        borderRadius:5
    },
    button: {
        width: 170,
        height: 40,
        margin: 15,
        backgroundColor: '#00AFF0',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        borderRadius:5
    },
};

export default Signup;
