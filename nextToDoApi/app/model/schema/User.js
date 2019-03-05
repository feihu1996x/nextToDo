const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
const { SALT_WORK_FACTOR, MAX_LOGIN_ATTEMPTS, LOCK_TIME } = require('../../../config');
const { hashPassword,checkPassword } = require('../../../utils');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    role: {
        type: String,
        default: 'user',
    },
    userId: {
        type: String,
        unique: true
    },
    openId: [String],
    unionId: String,
    comeFrom: String,
    nickname: String,
    username: {
        type: String,
        unique: true,
    },
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
    accessToken: {
        type: String,
    },
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

UserSchema.statics = {
    async getUserFromAccessToken(accessToken) {
        const userId = accessToken.split("::")[0];
        const user = await User.findOne({userId});
        if (user) {
            const isMatch = await checkPassword(`${user.username}::${user.email}`, accessToken.split("::")[1]);
            if (isMatch) {
                return user
            } else {
                return null
            }
        } else {
            return null
        }
    },
    async signUp(username, email, password) {
        let user = await User.findOne({
            $or: [
                {username},
                {email}
            ]
        });
        if (user) {
            let error = new Error('user exists!');
            error.status = 400;
            throw error
        }
        const userId = uuidv4();
        const msg = `${username}::${email}`;
        const accessToken = await hashPassword(msg, SALT_WORK_FACTOR);
        user = new User({
            username,
            email,
            password,
            userId,
            accessToken: accessToken
        });
        await user.save();
        return [{username, email}]
    },
    async signIn(account, password) {
        let user = await User.findOne({
            $or: [
                {username: account},
                {email: account},
            ]
        }, {
            _id: 0,
            __v: 0,
        });
        if (!user) {
            let error = new Error("user doesn't exist!");
            error.status = 400;
            throw error
        }
        if (user.isLocked) {
            let error = new Error("current user is locked!");
            error.status = 400;
            throw error
        }
        let isMatch = await checkPassword(password, user.password);
        if (!isMatch) {
            await user.incLoginAttempts(user);
            let error = new Error("password error");
            error.status = 400;
            throw error
        }
        return [{
            accessToken: `${user.userId}::${user.accessToken}`
        }]
    }
};

UserSchema.methods = {
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

const User = mongoose.model('User', UserSchema, 'users');
