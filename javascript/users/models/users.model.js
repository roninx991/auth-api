// Mongo ODM Mongoose Dependency
const mongoose = require("mongoose");

// Database Constants
const Schema = mongoose.Schema;

// Get DB Connection String
require("dotenv").config();
const MONGODB_URI = process.env.MONGODB_URI;


const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    permissionLevel: Number
 });

mongoose.connect(MONGODB_URI, {useNewUrlParser : true, useUnifiedTopology: true});
const connect = mongoose.connection;

connect.once('open', function() {
    console.log("Mongodb Database connection estabilished successfully")
});

const User = mongoose.model('Users', userSchema);

exports.createUser = (userData) => {
    const user = new User(userData);
    return user.save();
};

exports.findById = (id) => {
    return User.findById(id).then((result) => {
        result = result.toJSON();
        delete result._id;
        delete result.__v;
        return result;
    });
};

exports.patchUser = (id, userData) => {
    return new Promise((resolve, reject) => {
        User.findById(id, function (err, user) {
            if (err) reject(err);
            for (let i in userData) {
                user[i] = userData[i];
            }
            user.save(function (err, updatedUser) {
                if (err) return reject(err);
                resolve(updatedUser);
            });
        });
    })
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        User.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, users) {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            })
    });
};

exports.removeById = (userId) => {
    return new Promise((resolve, reject) => {
        User.remove({_id: userId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

exports.findByEmail = (email) => {
    return User.find({email: email});
};
