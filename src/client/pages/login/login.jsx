import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {BiLogoGmail} from "react-icons/bi";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/routes/auth/api/login', {
                username,
                password,
            });

            if (response.data.message === 'Login successful') {
                navigate('/home');
            } else {
                setMessage(response.data.message);
            }
        } catch (error) {
            console.error('Error logging in', error);
            setMessage('Error logging in');
        }
    };


    return (
        <div style={styles.outerContainer}>
            <div style={styles.container}>
                <form style={styles.form} onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <h2>Username:</h2>
                    <input
                        style={styles.input}
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <h2>Password:</h2>
                    <input
                        style={styles.input}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button style={styles.button} type="submit">Login</button>
                    <BiLogoGmail/>
                    <p>
                        <a href="/forgot-password">Forgot password?</a>
                    </p>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

const styles={
    outerContainer:{
        display: 'flex',
        justifyContent: 'center',
        width: '100%', // ensure it takes up full width
    },
    container:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
    },
    button: {
        width: 170,
        height: 40,
        margin: 30,
        backgroundColor: 'lightblue',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
    },
}

export default Login;
