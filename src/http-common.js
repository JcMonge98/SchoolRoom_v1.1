import axios from "axios";
import authHeader from './services/auth-header';
export default axios.create({

    // baseURL: "http://localhost:8080",
    baseURL: "https://app-schoolroom.herokuapp.com",
    headers: {
        "Content-type": "application/json",
        "x-access-token": authHeader()["x-access-token"]
    }
});


/*import axios from "axios";

let user = JSON.parse(localStorage.getItem('user'));

export default axios.create({
    //baseURL: "http://localhost:8080/api",
    baseURL: "http://localhost:8080/",
    headers: {
        'Content-type': 'application/json',
        'x-access-token': JSON.parse(localStorage.getItem('user'))
    }
});*/

















/*
'Access-Control-Allow-Header': '*',
'Content-Type': 'application/json',
'x-access-token': token, etc*/