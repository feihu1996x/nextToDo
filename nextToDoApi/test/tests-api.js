process.env.NODE_ENV = 'test';
process.env.PORT = 3000;

const chai = require('chai');
const chaiHttp = require('chai-http');
const config = require('../config');
const server = require('../nextToDoApi');

chai.use(chaiHttp);
chai.should();

describe('/', () => {
    it('should GET help information', (done) => {
        chai.request(server)
            .get(config.URL_PREFIX + '/')
            .end((err, res) => {
                if (err) {
                    console.error(err)
                } else {
                    res.status.should.equal(200);
                    console.debug(res.body);
                    res.body.should.be.an('Object');
                }
                done();
            })
    })
});
