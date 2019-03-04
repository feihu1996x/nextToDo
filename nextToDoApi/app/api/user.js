const mongoose = require('mongoose');

exports.signUp = async (username, email, password) => {
    const User = mongoose.model('User');
    return await User.signUp(username, email, password);

};

exports.signIn = async (account, password) => {
    const User = mongoose.model('User');
    return await User.signIn(account, password);
};
