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
        fetch(`${apiUrl}/login`, {
            method: 'get',
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

    isOwner(owner_id) {
        return owner_id === this.user._id;
    }
}

export default new UserService();