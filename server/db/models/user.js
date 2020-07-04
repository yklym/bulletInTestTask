const {InvalidFormError, CantFindError} = require("../../utils/exceptions");



const UserModel = require("../schemas/user");

class User {

    static getAll() {
        return UserModel.find().sort({
            created: -1
        });
    }

    static getById(id) {
        return UserModel.findById(id).then(res => {
            if (!res) {
                return Promise.reject(new CantFindError("Can't find user with id: " + id))
            }
            return res;
        });
    }

    static checkIfFreeEmail(userEmail){
        return this.getByEmail(userEmail).then(()=>{
            return false;
        }).catch(()=>{
            return true;
        })
    }

    static getByEmail(userEmail) {
        return UserModel.findOne({email : userEmail}).then(res => {
            if (!res) {
                return Promise.reject(new CantFindError("No users with such an email: " + userEmail))
            }
            return res;
        });
    }

    static update(id, newUser) {
        try {
            this.checkUserFields(newUser)
            const res = UserModel.findByIdAndUpdate(id, newUser);
            if (!res) {
                throw new CantFindError("Can't find user with id: " + id)
            }
            return res;
        } catch (e) {
            throw e
        }
    }

    static insert(user) {
        try {
            this.checkUserFields(user)
            return new UserModel(user).save();
        } catch (e) {
            return Promise.reject(e)
        }
    }

    static deleteById(id) {
        const res = UserModel.findByIdAndDelete(id);
        if (!res) {
            return Promise.reject(new CantFindError("Can't find user with id: " + id))
        }
        return res
    }

    static checkUserFields({email, password, firstName, lastName}) {
        if (!email || !password || !firstName || !lastName) {
            throw new InvalidFormError("request doesn't have one of required fields")
        }
    }
}


module.exports = User;
