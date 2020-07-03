import { apiUrl } from "../config";

class JobService {
    constructor() {
        this.posts = [];
    }

    loadAll() {
        return fetch(apiUrl + `/posts`, {
            method: "GET",
        })
            .then((res) => {
                return res.json();
            })
            .then((parsedRes) => {
                this.posts = parsedRes.data;
                return this.posts;
            });
    }

    getPage(pageNumber = 1, pageSize = 10) {
        let postsArr = this.posts;
        pageNumber = Math.max(0, pageNumber - 1); // In case we are passing 0
        let startIndex = pageNumber * pageSize;
        if (startIndex > postsArr.length) {
            startIndex = postsArr.length - pageSize;
        }
        return postsArr.slice(startIndex, startIndex + pageSize);

    }

    getPagesCount(pageSize){
        return Math.ceil(this.posts.length / pageSize);
    }
    // TODO - loadPostById(id);
    // TODO - createPost
}

const service = new JobService();

export default service;