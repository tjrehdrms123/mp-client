import axios from "axios";

export function setAuthorizationToken(accessToken) {      
    if(accessToken){
        return axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    } else {
        return axios.defaults.headers.common["Authorization"];
    }        
}

export function setLocalStorageAuthorizationToken() {      
    const localStorageAccessToken = localStorage.getItem('accessToken');  
    if(localStorageAccessToken){
        return axios.defaults.headers.common["Authorization"] = `Bearer ${localStorageAccessToken}`;
    } else {
        return axios.defaults.headers.common["Authorization"];
    }        
}