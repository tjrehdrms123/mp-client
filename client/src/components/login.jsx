import React, { useState } from 'react'
import { loginAPI } from '../api/api';
import { setAuthorizationToken } from '../utils/interceptor';

function Login() {
  const [uid, setUid] = useState("wwe5455");
  const [password, setPassword] = useState("1234");
  const [emailAuthCode, setemailAuthCode] = useState("53f806b09faa45415cc8e6fefb858b104ab5299b063f4cf2b255c336003ac1c2");
  const onChangeUidEvent = (e) => (
    setUid(e.target.value)
  );
  const onChangePasswordEvent = (e) => (
    setPassword(e.target.value)
  );
  const onChangeEmailAuthCodeEvent = (e) => (
    setemailAuthCode(e.target.value)
  );
  const onSubmit = async () => {
    const submitData = {
        "uid" : uid,
        "password" : password,
        "email_auth_code" : emailAuthCode,
        "auth_type" : 0
    };
    const loginData = await loginAPI(submitData);
    const { status, data } = loginData;
    const accessToken = data.accessToken;
    if (status === 200) {
        localStorage.setItem('accessToken',accessToken);
        setAuthorizationToken(accessToken);
        alert(`${data.message}`);
        window.location.href=`/`;
    } else {
        alert(`Error : ${data.message}`);
    }
  }
  
  return (
    <>
        <div className="form-signin">
            <h2 className="form-signin-heading">메모 쓰러 로그인하기</h2>
                <input type="text" onChange={onChangeUidEvent} value={uid} className="uid form-control" name="uid" placeholder='아이디' required autoFocus/>
                <input type="password" onChange={onChangePasswordEvent} value={password} className="password form-control" name="password" placeholder='비밀번호' required />
                <input type="text" onChange={onChangeEmailAuthCodeEvent} value={emailAuthCode} className="email_auth_code form-control" name="email_auth_code" placeholder='이메일 인증 코드' required />
                <br/>
            <div type="submit" onClick={onSubmit} className="btn btn-lg btn-primary btn-block">로그인</div>
        </div>
    </>
  )
}

export default Login