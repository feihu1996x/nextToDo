process.env.NODE_ENV = 'test';
process.env.PORT = 3000;

const { ResponseJson } = require('../app/lib').Response;
const { hashPassword } = require('../utils');
const chai = require('chai');

chai.should();

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
    const password = '123456';
    const salt_work_factor = 10;
    it('should return a String', async () => {
        const hash = await hashPassword(password, salt_work_factor);
        console.debug(hash);
        hash.should.be.a('string')
    }).timeout(1000)
});
