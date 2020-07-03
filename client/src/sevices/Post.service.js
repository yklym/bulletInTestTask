import { serverUrl } from "../config/config";

class JobService {
    constructor() {
        this.posts = [];
    }

    loadAll() {
        return fetch(serverUrl + `/posts`, {
            method: "GET",
        })
            .then((res) => {
                return res.json();
            })
            .then((parsedRes) => {
                this.posts = parsedRes;
                return this.posts;
            });
    }
    // TODO - loadPostById(id);
    // TODO - createPost
}

const service = new JobService();

export default service;