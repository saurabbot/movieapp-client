import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
} from './types';


export function registerUser(dataToSubmit){
    const request = axios.post('https://movieappfasal.herokuapp.com/api/users/register',dataToSubmit)
        .then(response => response.data);
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit){
    const request = axios.post('https://movieappfasal.herokuapp.com/api/users/login',dataToSubmit)
                .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth(){
    const request = axios.get('https://movieappfasal.herokuapp.com/api/users/auth')
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser(){
    const request = axios.get('https://movieappfasal.herokuapp.com/api/users/logout')
    .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

