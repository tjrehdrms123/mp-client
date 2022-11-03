import React, { useState } from 'react'
import { emailAuthAPI, registerAPI } from '../api/api';
import Adfit from './adfit';

function Register() {
  const [strogeObjectId, setStrogeObjectId] = useState(localStorage.getItem('objectId'));
  const [uid, setUid] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const onChangeUidEvent = (e) => (
    setUid(e.target.value)
  );
  const onChangeNameEvent = (e) => (
    setName(e.target.value)
  );
  const onChangePasswordEvent = (e) => (
    setPassword(e.target.value)
  );
  const onChangeEmailEvent = (e) => (
    setEmail(e.target.value)
  );
  const onSubmit = async () => {
    const submitData = {
        "uid" : uid,
        "name" : name,
        "email" : email,
        "password" : password,
        "auth_type" : 0
    };
    const emailData = {
        "email" : email,
    }
    const registerData = await registerAPI(submitData);
    const { status, data } = registerData;
    if (status === 200) {
      alert("회원가입이 완료 됐습니다.");
      window.location.href=`/login`;
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
            <h2 className="form-signin-heading">회원가입</h2>
                <input type="text" onChange={onChangeUidEvent} value={uid} className="uid form-control" name="uid" placeholder='아이디' required autoFocus/>
                <input type="text" onChange={onChangeNameEvent} value={name} className="name form-control" name="name" placeholder='이름' required />
                <input type="password" onChange={onChangePasswordEvent} value={password} className="password form-control" name="password" placeholder='비밀번호' required />
                <input type="text" onChange={onChangeEmailEvent} value={email} className="email form-control" name="email" placeholder='이메일' required />
                <br/>
            <div type="submit" onClick={onSubmit} className="btn btn-lg btn-login btn-block">회원가입 하기</div>
        </div>
        <Adfit/>
    </>
  )
}

export default Register