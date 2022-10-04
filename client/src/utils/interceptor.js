import axios from "axios";

export default function setAuthorizationToken(accessToken) {      
    if(accessToken){
        return axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    } else {
        return axios.defaults.headers.common["Authorization"];
    }        
}