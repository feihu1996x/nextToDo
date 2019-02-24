const mongoose = require('mongoose');
const { SALT_WORK_FACTOR, MAX_LOGIN_ATTEMPTS, LOCK_TIME } = require('../../../config');
const { hashPassword } = require('../../../utils');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    role: {
        type: String,
        default: 'user',
    },
    openId: [String],
    unionId: String,
    comeFrom: String,
    nickname: String,
    address: String,
    province: String,
    country: String,
    city: String,
    gender: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    loginAttempts: {
        type: Number,
        required: true,
        default: 0,
    },
    lockUntil: Number,
    meta: {
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        updatedAt: {
            type: Date,
            default: Date.now(),
        },
    },
});

UserSchema.virtual('isLocked').get(() => {
    return !!(this.lockUntil && this.lockUntil > Date.now())
});

UserSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
        this.meta.updatedAt = Date.now();
    }
    next();
});

UserSchema.pre('save', function (next) {
    let user = this;
    if (!user.isModified('password')) {
        return next
    }
    hashPassword(user.password, SALT_WORK_FACTOR)
        .then((hash) => {
            user.password = hash;
            next()
        })
        .catch((err) => {
            next(err)
        });
});

UserSchema.methods = {
    checkPassword(_password, password) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(_password, password, (err, isMatch) => {
                if (!err) {
                    return resolve(isMatch)
                } else {
                    return reject(err)
                }
            })
        })
    },
    incLoginAttempts(user) {
        let that = user;
        return new Promise((resolve, reject) => {
            if (that.lockUntil && that.lockUntil < Date.now()) {
                that.update({
                    $set: {
                        loginAttempts: 1,
                    },
                    $unset: {
                        lockUntil: 1
                    }
                }, (err) => {
                    if (!err) {
                        resolve(true)
                    } else {
                        reject(err)
                    }
                })
            } else {
                let updates = {
                    $inc: {
                        loginAttempts: 1,
                    }
                };
                if (that.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS || !that.isLocked) {
                    updates.$set = {
                        lockUntil: Date.now() + LOCK_TIME
                    }
                }
                that.update(updates, err => {
                    if (!err) {
                        resolve(true)
                    } else {
                        reject(err)
                    }
                });
            }
        })
    }
};

mongoose.model('User', UserSchema, 'users');
