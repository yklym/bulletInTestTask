const {InvalidFormError, CantFindError} = require("../../utils/exceptions");
const PostModel = require("../schemas/post");
const UserModel = require("../schemas/user");

class Post {

    static getAll() {
        return PostModel.find().sort({
            created: -1
        });
    }

    static getById(id) {
        return PostModel.findById(id).then(res => {
            if (!res) {
                return Promise.reject(new CantFindError("Can't find post with id: " + id))
            }
            return res;
        });
    }

    static update(id, newPost) {
        try {
            this.checkPostFields(newPost)
            const res = PostModel.findByIdAndUpdate(id, newPost);
            if (!res) {
                throw new CantFindError("Can't find user with id: " + id)
            }
            return res;
        } catch (e) {
            return Promise.reject(e)
        }
    }

    static insert(post) {
        try {
            let insertedPost = null;
            this.checkPostFields(post)
            return new PostModel(post).save().then(post => {
                insertedPost = post;
                UserModel.findById(post.user).then(userToUpdate => {
                    userToUpdate.posts.push(insertedPost);
                    userToUpdate.save();
                    return userToUpdate;
                })
            });
        } catch (e) {
            return Promise.reject(e)
        }
    }

    static deleteById(id) {
        const res = PostModel.findByIdAndDelete(id);
        if (!res) {
            return Promise.reject(new CantFindError("Can't find post with id: " + id))
        }
        return res
    }

    static checkPostFields({user, name}) {
        if (!user || !name) {
            throw new InvalidFormError("request doesn't have one of required fields")
        }
    }
}

module.exports = Post;
