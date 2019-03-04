process.env.NODE_ENV = 'test';
process.env.PORT = 3000;

const { ResponseJson } = require('../app/lib').Response;
const { hashPassword, checkPassword } = require('../utils');
const chai = require('chai');

chai.should();

let password = "123456",
    hashedPassword;

describe('ResponseJson() tests', () => {
    const res = {
        status(status) {
            console.debug(status);
            return this
        },
        json(data) {
            console.debug(data);
            return this
        }
    };
    it('should return an Object', async () => {
        const data = ['ResponseJson() tests'];
        const rst = ResponseJson(res, data);
        rst.should.be.an('object');
    }).timeout(1000)
});

describe('hashPassword() tests ', function () {
    const salt_work_factor = 10;
    it('should return a String', async () => {
        hashedPassword = await hashPassword(password, salt_work_factor);
        console.debug(hashedPassword);
        hashedPassword.should.be.a('string')
    }).timeout(1000)
});

describe('checkPassword() tests', function () {
   it('should return true', async () => {
       const isMatch = await checkPassword(password, hashedPassword);
       console.debug(isMatch);
       isMatch.should.equal(true);
   }).timeout(1000)
});