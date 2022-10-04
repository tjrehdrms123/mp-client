import axios from "axios";
import { BASEURL } from "../config";

const loginPath = "user/login";

export const loginAPI = async (data) => {
	const res = await axios.post(`${BASEURL}${loginPath}`,data);
	return res.data;
}