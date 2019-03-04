const api = require('../api');
const { ResponseJson } = require('../lib').Response;
const { check, validationResult } = require('express-validator/check');

exports.signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const data = await api.User.signUp(username, email, password);
        return ResponseJson(res, data);
    } catch (error) {
        console.error(error);
        return ResponseJson(res, [], error.message || 'something went wrong', error.status || 500)
    }
};

exports.signUpValidator = [
    check('username').isString(),
    check('email').isEmail(),
    check('password').isString(),
    check('password').isLength({min: 8}),
    endValidate
];

exports.signIn = async (req, res) => {
    try {
        const { account, password } = req.body;
        const data = await api.User.signIn(account, password);
        return ResponseJson(res, data);
    } catch (error) {
        console.error(error);
        return ResponseJson(res, [], error.message || 'something went wrong', error.status || 500)
    }
};

exports.signInValidator = [
    check('account').isString(),
    check('password').isString(),
    endValidate
];

function endValidate(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.debug(errors.array());
        return ResponseJson(res, [], 'invalid parameter', 400);
    } else {
        next()
    }
}
