import React from 'react';
import { GoogleLogin } from 'react-google-login';

const Google = () => {
    const responseGoogle = (response) => {
        console.log(response);
        // 你可以在这里处理Google登录的响应，例如将返回的令牌发送到你的后端服务器
    }

    return (
        <div>
            <GoogleLogin
                clientId="997666871317-gfrm9malcq0bb05mp8osn9oscn99v4m6.apps.googleusercontent.com" // 这里应该是你在Google API Console上配置的OAuth应用的客户端ID
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
}

export default Google;
