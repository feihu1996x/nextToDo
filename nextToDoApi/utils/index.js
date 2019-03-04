const bcrypt = require('bcrypt');

exports.hashPassword = (password, salt_work_factor) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(salt_work_factor, (err, salt) => {
            if (err) {
                return reject(err)
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    return reject(err)
                }
                resolve(hash);
            });
        });
    });
};

exports.checkPassword = (_password, password) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(_password, password, (err, isMatch) => {
            if (!err) {
                return resolve(isMatch)
            } else {
                return reject(err)
            }
        })
    })
};
