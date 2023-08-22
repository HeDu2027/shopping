import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
const LogByEmail = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleCodeChange = (event) => {
        setCode(event.target.value);
    };

    const handleSendClick = (event) => {
        event.preventDefault();
        fetch('http://localhost:4000/routes/emailverify/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log("Email sent");
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleConfirmClick = () => {
        fetch('http://localhost:4000/routes/emailverify/confirm-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, verificationCode: code }),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((errorData) => {
                        throw new Error('Error: ' + JSON.stringify(errorData));
                    });
                }
                return response.json();
            })
            .then((data) => {
                if (data.message === 'Email confirmed') {
                    navigate('/home');
                } else {
                    // 显示错误消息，或者进行其他处理
                    console.error(data.message);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };



    return (
        <div>
            <h1>Login by email</h1>
            <form>
                <input
                    type="email" // 更改为 email 类型以利用 HTML5 的内建验证
                    name="email" // 更改 name 属性
                    placeholder="Email Address"
                    onChange={handleEmailChange}
                    style={{width: "200px", height: "35px"}}
                />
                <button onClick={handleSendClick} type="button" style={{width:100,height:40}}>
                    Send
                </button>
                <input
                    type="text"
                    name="code"
                    placeholder="Verify Code"
                    onChange={handleCodeChange}
                    style={{width: "200px", height: "35px"}}
                />
                <button onClick={handleConfirmClick} type="button" style={{width:100,height:40}}>
                    Confirm
                </button>
            </form>
        </div>
    );

}

export default LogByEmail;
