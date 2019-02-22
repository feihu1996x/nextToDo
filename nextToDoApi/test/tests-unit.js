process.env.NODE_ENV = 'test';
process.env.PORT = 3000;

const { ResponseJson } = require('../app/lib').Response;
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
