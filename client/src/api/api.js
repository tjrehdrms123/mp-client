import axios from "axios";
const { REACT_APP_PARSE_API } = process.env;

const loginPath = "user/login";
const registerPath = "user/signup";
const emailAuthPath = "auth/email";
const pageGetPath = "page";

export const loginAPI = async (data) => {
  const res = await axios.post(`${REACT_APP_PARSE_API}${loginPath}`, data);
  return res.data;
};
export const registerAPI = async (data) => {
  const res = await axios.post(`${REACT_APP_PARSE_API}${registerPath}`, data);
  return res.data;
};
export const emailAuthAPI = async (data) => {
  const res = await axios.post(`${REACT_APP_PARSE_API}${emailAuthPath}`, data);
  return res.data;
};
export const pageGetAllAPI = async () => {
  const res = await axios.get(`${REACT_APP_PARSE_API}${pageGetPath}`);
  return res.data;
};
export const pageGetAPI = async (data) => {
  const res = await axios.get(
    `${REACT_APP_PARSE_API}${pageGetPath}/${data}`,
    data
  );
  return res.data;
};
export const pagePostAPI = async (data) => {
  const res = await axios.post(`${REACT_APP_PARSE_API}${pageGetPath}`, data);
  return res.data;
};
