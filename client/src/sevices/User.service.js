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
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => {
            if (res.status === 500) {
                return Promise.reject("Server error occured");
            }
            return res.json()
        }).then(parsedData => {
            if (parsedData.err) {
                return Promise.reject(parsedData.message);
            }

            if (parsedData.data.token) {
                let user = jwt_decode(parsedData.data.token);
                localStorage.setItem("token", parsedData.data.token);
                localStorage.setItem("user", JSON.stringify(user));
                return user;
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
            if (res.status === 500) {
                return Promise.reject("Server error occurred");
            }
            return res.json()
        })
            .then(parsedData => {
                console.log("Parsed data:")
                console.log(parsedData)
                if (parsedData.err) {
                    return Promise.reject(parsedData.message);
                }
                if (parsedData.data.token) {
                    let user = jwt_decode(parsedData.data.token);

                    localStorage.setItem("token", parsedData.data.token);
                    localStorage.setItem("user", JSON.stringify(user));

                    return user;
                }
            });
    }

    isOwner(owner_id) {
        return owner_id === this.user._id;
    }
}

export default new UserService();