import {apiUrl} from "../config";
import jwt_decode from "jwt-decode";

class UserService {

    get user() {
        return JSON.parse(localStorage.getItem("user"));
    }

    logOut() {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }

    logIn(data) {
        return fetch(`${apiUrl}/auth/login`, {
            method: 'post',
            body: data
        }).then(res => {
            return res.json()
        })
            .then(data => {
                if (data.token) {
                    localStorage.setItem("token", data.token);
                    let res = jwt_decode(localStorage.token);
                    return res;
                } else {
                    localStorage.removeItem("token");
                    return {
                        role: null,
                        _id: null,
                        username: null,
                    }
                }
            });
    }

    register(data) {
        return fetch(`${apiUrl}/auth/register`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => {
            return res.json()
        })
            .then(parsedData => {
                if (parsedData.err) {
                    return Promise.reject(parsedData.message);
                }
                if (parsedData.data.token) {
                    localStorage.setItem("token", parsedData.data.token);
                    let res = jwt_decode(localStorage.token);
                    return res;
                }
            });
    }

    isOwner(owner_id) {
        return owner_id === this.user._id;
    }
}

export default new UserService();