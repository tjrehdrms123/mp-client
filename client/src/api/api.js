import axios from "axios";
import { BASEURL } from "../config";
const { REACT_APP_PARSE_API } = process.env;

const loginPath = "user/login";
const pageGetAllPath = "page";

export const loginAPI = async (data) => {
	const res = await axios.post(`${REACT_APP_PARSE_API}${loginPath}`,data);
	return res.data;
}
export const pageGetAllAPI = async () => {
	const res = await axios.get(`${REACT_APP_PARSE_API}${pageGetAllPath}`);
	return res.data;
}