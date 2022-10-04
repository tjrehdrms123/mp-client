import axios from "axios";
import { BASEURL } from "../config";

const loginPath = "user/login";
const pageGetAllPath = "page";

export const loginAPI = async (data) => {
	const res = await axios.post(`${BASEURL}${loginPath}`,data);
	return res.data;
}
export const pageGetAllAPI = async () => {
	const res = await axios.get(`${BASEURL}${pageGetAllPath}`);
	return res.data;
}