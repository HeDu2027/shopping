import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
const LogBySMS = () => {

    const navigate=useNavigate();

    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [code, setCode] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "phoneNumber") setPhoneNumber(value);
        if (name === "countryCode") setCountryCode(value);
        if (name === "code") setCode(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add the logic to send SMS here.
        fetch('http://localhost:4000/routes/auth/api/send-sms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phone: countryCode + phoneNumber,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('SMS sent:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleConfirm = (event) => {
        event.preventDefault();
        fetch('http://localhost:4000/routes/auth/api/verify-sms-code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phone: countryCode + phoneNumber,
                code,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Verification response:', data);
                if (data.message === 'Verification successful') {
                    navigate('/home');  // 验证成功后跳转到'/home'页面
                } else {
                    // 处理其他情况，例如显示错误消息
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

        return (
            <div>
                <h1>Login by mobile SMS</h1>
                <form onSubmit={handleSubmit}>
                    <select
                        name="countryCode"
                        onChange={handleChange}
                        style={{width: "110px", height: "40px"}}
                    >
                        <option value="">Country Code</option>
                        <option value="+1">+1 (USA, Canada)</option>
                        <option value="+7">+7 (Russia, Kazakhstan)</option>
                        <option value="+20">+20 (Egypt)</option>
                        <option value="+27">+27 (South Africa)</option>
                        <option value="+30">+30 (Greece)</option>
                        <option value="+31">+31 (Netherlands)</option>
                        <option value="+32">+32 (Belgium)</option>
                        <option value="+33">+33 (France)</option>
                        <option value="+34">+34 (Spain)</option>
                        <option value="+36">+36 (Hungary)</option>
                        <option value="+39">+39 (Italy)</option>
                        <option value="+40">+40 (Romania)</option>
                        <option value="+41">+41 (Switzerland)</option>
                        <option value="+43">+43 (Austria)</option>
                        <option value="+44">+44 (UK)</option>
                        <option value="+45">+45 (Denmark)</option>
                        <option value="+46">+46 (Sweden)</option>
                        <option value="+47">+47 (Norway)</option>
                        <option value="+48">+48 (Poland)</option>
                        <option value="+49">+49 (Germany)</option>
                        <option value="+51">+51 (Peru)</option>
                        <option value="+52">+52 (Mexico)</option>
                        <option value="+53">+53 (Cuba)</option>
                        <option value="+54">+54 (Argentina)</option>
                        <option value="+55">+55 (Brazil)</option>
                        <option value="+56">+56 (Chile)</option>
                        <option value="+57">+57 (Colombia)</option>
                        <option value="+58">+58 (Venezuela)</option>
                        <option value="+60">+60 (Malaysia)</option>
                        <option value="+61">+61 (Australia)</option>
                        <option value="+62">+62 (Indonesia)</option>
                        <option value="+63">+63 (Philippines)</option>
                        <option value="+64">+64 (New Zealand)</option>
                        <option value="+65">+65 (Singapore)</option>
                        <option value="+66">+66 (Thailand)</option>
                        <option value="+81">+81 (Japan)</option>
                        <option value="+82">+82 (South Korea)</option>
                        <option value="+84">+84 (Vietnam)</option>
                        <option value="+86">+86 (China)</option>
                        <option value="+90">+90 (Turkey)</option>
                        <option value="+91">+91 (India)</option>
                        <option value="+92">+92 (Pakistan)</option>
                        <option value="+93">+93 (Afghanistan)</option>
                        <option value="+94">+94 (Sri Lanka)</option>
                        <option value="+95">+95 (Myanmar)</option>
                        <option value="+98">+98 (Iran)</option>
                        <option value="+212">+212 (Morocco)</option>
                        <option value="+213">+213 (Algeria)</option>
                        <option value="+216">+216 (Tunisia)</option>
                        <option value="+218">+218 (Libya)</option>
                        <option value="+220">+220 (Gambia)</option>
                        <option value="+221">+221 (Senegal)</option>
                        <option value="+222">+222 (Mauritania)</option>
                        <option value="+223">+223 (Mali)</option>
                        <option value="+224">+224 (Guinea)</option>
                        <option value="+225">+225 (Côte d'Ivoire)</option>
                        <option value="+226">+226 (Burkina Faso)</option>
                        <option value="+227">+227 (Niger)</option>
                        <option value="+228">+228 (Togo)</option>
                        <option value="+229">+229 (Benin)</option>
                        <option value="+230">+230 (Mauritius)</option>
                        <option value="+231">+231 (Liberia)</option>
                        {}
                    </select>
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        onChange={handleChange}
                        style={{width: "200px", height: "35px"}}
                    />
                    <button type="submit" style={{width:100,height:40}}>
                        {}
                        Send
                    </button>
                    <input
                        type="text"
                        name="code" // 更新name属性来与state中的属性一致
                        placeholder="Verify Code"
                        onChange={handleChange}
                        style={{width: "200px", height: "35px"}}
                    />
                    <button onClick={handleConfirm} type="button" style={{width:100,height:40}}> {}
                        Confirm
                    </button>
                </form>
            </div>
        );
}

export default LogBySMS;
