const mongoose = require("mongoose")
const {InvalidFormError} = require("../../utils/exceptions");

const UserSchema = require("../schemas/user");
const UserModel = mongoose.model('User', UserSchema);

class User {
    constructor({email, password, firstName, lastName, posts=[]}) {
        if(!email || !password || !firstName || !lastName){
            throw new InvalidFormError("request doesn't have one of required fields")
        }
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.posts = posts;
    }

    static getAll() {
        return UserModel.find().sort({
            created: -1
        });
    }

    static getById(id) {
        return this.getAll()
            .then(charsJsonStr => {
                return charsJsonStr.find((element) => element.id === id);
            });
    }

    static update(id, newObj) {
        return UserModel.findByIdAndUpdate(id, newObj);
    }

    static insert(user) {
        return new UserModel(user).save();
    }

    static deleteById(id) {
        return UserModel.findByIdAndDelete(id);
    }
}

module.exports = User;
