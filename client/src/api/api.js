import axios from "axios";
const { REACT_APP_PARSE_API } = process.env;

const loginPath = "user/login";
const registerPath = "user/signup";
const emailAuthPath = "auth/email";
const pageGetPath = "page";

export const loginAPI = async (data) => {
  // 로그인 API
  const res = await axios.post(`${REACT_APP_PARSE_API}${loginPath}`, data);
  return res.data;
};
export const registerAPI = async (data) => {
  // 회원가입 API
  const res = await axios.post(`${REACT_APP_PARSE_API}${registerPath}`, data);
  return res.data;
};
export const emailAuthAPI = async (data) => {
  // 이메일 인증 API
  const res = await axios.post(`${REACT_APP_PARSE_API}${emailAuthPath}`, data);
  return res.data;
};
export const pageGetAllAPI = async () => {
  // 지도 데이터 모두 가져오기 API
  const res = await axios.get(`${REACT_APP_PARSE_API}${pageGetPath}`);
  return res.data;
};
export const pageGetAPI = async (data) => {
  // 회원 지도 데이터 가져오기 API
  const res = await axios.get(
    `${REACT_APP_PARSE_API}${pageGetPath}/${data}`,
    data
  );
  return res.data;
};
export const pagePostAPI = async (data) => {
  // 지도에 글 작성 API
  await alert('추억 등록중 입니다 3초 기다려주세요');
  const res = await axios.post(`${REACT_APP_PARSE_API}${pageGetPath}`, data);
  return res.data;
};
