import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loginAPI } from '../api/api';
import { setAuthorizationToken } from '../utils/interceptor';

function Login() {
  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");
  const [strogeObjectId, setStrogeObjectId] = useState(localStorage.getItem('objectId'));
  const [emailAuthCode, setemailAuthCode] = useState("");
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
    console.log(loginData);
    const { status, data } = loginData;
    const accessToken = data.accessToken;
    const refreshToken = data.refreshToken;
    if (status === 200) {
        localStorage.setItem('accessToken',accessToken);
        localStorage.setItem('refreshToken',refreshToken);
        localStorage.setItem('objectId',data.objectId);
        setAuthorizationToken(accessToken);
        alert(`${data.message}`);
        window.location.href=`/map/${data.objectId}`;
    } else {
        alert(`Error : ${data.message}`);
    }    
  }
  if(strogeObjectId != '' && strogeObjectId != null && strogeObjectId != undefined){    
    window.location.href=`/map/${strogeObjectId}`;
  }
  return (
    <>
        <div className="form-signin">
            <h2 className="form-signin-heading text">추억 <span className='main_color bold'>지도</span> 보러가기</h2>
            <h5 className="form-signin-heading text">나의 추억을 지도에 등록하고 공유해보세요</h5>
            <input type="text" onChange={onChangeUidEvent} value={uid} className="uid form-control" name="uid" placeholder='아이디'  autoFocus/>
                <input type="password" onChange={onChangePasswordEvent} value={password} className="password form-control" name="password" placeholder='비밀번호'  />
                <input type="text" onChange={onChangeEmailAuthCodeEvent} value={emailAuthCode} className="email_auth_code form-control" name="email_auth_code" placeholder='이메일 인증 코드'  />
                <br/>
            <div type="submit" onClick={onSubmit} className="btn btn-lg btn-login btn-block">로그인</div>
            <br/>
            <Link to={'/register'}>
              <div type="submit" className="btn btn-lg btn-login btn-block">내 지도 만들러 가기</div>
            </Link>
        </div>
    </>
  )
}

export default Login