const mongoose = require("mongoose")

const PostSchema = require("../schemas/post")
const PostModel = mongoose.model('Post', PostSchema);

class Post {

    constructor(name = "", description = "", user = -1) {
        this.name = name;
        this.description = description;
        this.user = user;

        let dateTmp = new Date();
        this.addedAt = dateTmp.toISOString();
    }

    static getAll() {
        return PostModel.find().sort({
            created: -1
        });
    }

    static getById(id) {
        return this.getAll()
            .then(resJsonStr => {
                return resJsonStr.find((element) => element.id === id);
            });
    }

    static update(id, newObj) {
        return PostModel.findByIdAndUpdate(id, newObj);
    }

    static insert(user) {
        return new PostModel(user).save();
    }

    static deleteById(id) {
        return PostModel.findByIdAndDelete(id);
    }
}

module.exports = Post;
