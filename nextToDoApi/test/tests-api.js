process.env.NODE_ENV = 'test';
process.env.PORT = 3000;

const chai = require('chai');
const chaiHttp = require('chai-http');
const config = require('../config');
const server = require('../nextToDoApi');
const uuidV4 = require('uuid/v4');

let token = 'xx(S&5J1',
    todoId = 1,
    username = `test_${uuidV4()}`,
    email = `test_${uuidV4()}@163.com`,
    password = '0po$V7C&';

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
                    res.body.should.be.an('object');
                }
                done();
            })
    }).timeout(1000)
});

describe('POST /user', () => {
    it('should POST a user', (done) => {
        chai.request(server)
            .post(`${config.URL_PREFIX}/user`)
            .send({
                username: username,
                email: email,
                password: password,
            })
            .end((err, res) => {
                if (err) {
                    console.error(err)
                } else {
                    res.status.should.equal(200);
                    console.debug(res.body);
                }
                done()
            })
    }).timeout(1000);
    it('should GET 400 Response', (done) => {
        chai.request(server)
            .post(`${config.URL_PREFIX}/user`)
            .send({
                username,
                email,
                password,
            })
            .end((err, res) => {
                if (err) {
                    console.error(err);
                } else {
                    res.status.should.equal(400);
                    console.debug(res.body);
                }
                done()
            })
    }).timeout(1000)
});

describe('PUT /user', () => {
    it('should PUT a user', (done) => {
        chai.request(server)
            .put(`${config.URL_PREFIX}/user`)
            .send({
                account: username,
                password,
            })
            .end((err, res) => {
                if (err) {
                    console.error(err)
                } else {
                    res.status.should.equal(200);
                    token = res.body.data[0].accessToken;
                    console.debug(res.body);
                }
                done()
            })
    }).timeout(1000);
    it('should PUT a user', (done) => {
        chai.request(server)
            .put(`${config.URL_PREFIX}/user`)
            .send({
                account: email,
                password,
            })
            .end((err, res) => {
                if (err) {
                    console.error(err)
                } else {
                    res.status.should.equal(200);
                    console.debug(res.body);
                }
                done()
            })
    }).timeout(1000);
    it('should GET 400 Response', (done) => {
        chai.request(server)
            .put(`${config.URL_PREFIX}/user`)
            .send({
                account: email,
                password: '12343578',
            })
            .end((err, res) => {
                if (err) {
                    console.error(err)
                } else {
                    res.status.should.equal(400);
                    console.debug(res.body);
                }
                done()
            })
    }).timeout(1000);
});

describe('GET /todo', () => {
    it('should GET todo list', (done) => {
        chai.request(server)
            .get(config.URL_PREFIX + '/todo')
            .set('Access-Token', token)
            .end((err, res) => {
                if (err) {
                    console.error(err)
                } else {
                    res.status.should.equal(200);
                    console.debug(res.body);
                    res.body.should.be.an('object');
                }
                done();
            })
    }).timeout(1000);
    it('should GET 401 Not Authorized', (done) => {
        chai.request(server)
            .get(config.URL_PREFIX + '/todo')
            .end((err, res) => {
                if (err) {
                    console.error(err)
                } else {
                    res.status.should.equal(401);
                    console.debug(res.body);
                    res.body.should.be.an('object');
                }
                done();
            })
    }).timeout(1000);
});

describe('POST /todo', () => {
    it('should POST a todo', (done) => {
        chai.request(server)
            .post(config.URL_PREFIX + '/todo')
            .set('Access-Token', token)
            .send({
                id: todoId,
                content: '兰洁，我想你',
            })
            .end((err, res) => {
                if (err) {
                    console.error(err)
                } else {
                    res.status.should.equal(200);
                    console.debug(res.body);
                }
                done()
            })
    }).timeout(1000);
    it('should GET 400 Response', (done) => {
        chai.request(server)
            .post(config.URL_PREFIX + '/todo')
            .set('Access-Token', token)
            .send({
                id: todoId
            })
            .end((err, res) => {
                if (err) {
                    console.error(err)
                } else {
                    res.status.should.equal(400);
                    console.debug(res.body);
                }
                done()
            })
    }).timeout(1000);
    it('should GET 401 Response', (done) => {
        chai.request(server)
            .post(config.URL_PREFIX + '/todo')
            .send({
                id: 1,
                content: '兰洁，我想你',
            })
            .end((err, res) => {
                if (err) {
                    console.error(err)
                } else {
                    res.status.should.equal(401);
                    console.debug(res.body);
                }
                done()
            })
    })
});

describe('PATHC /todo/:id', function () {
    it('should PATCH a todo', (done) => {
        chai.request(server)
        .patch(`${config.URL_PREFIX}/todo/${todoId}`)
        .set('Access-Token', token)
        .send({
            completed: true
        })
        .end((err, res) => {
            if (err) {
                console.error(err)
            } else {
                res.status.should.equal(200)
                console.debug(res.body)
            }
            done()
        })
    }).timeout(1000)
});

describe('DELETE /todo/:id', () => {
    it('should DELETE a todo', (done) => {
        chai.request(server)
            .delete(`${config.URL_PREFIX}/todo/${todoId}`)
            .set('Access-Token', token)
            .end((err, res) => {
                if (err) {
                    console.error(err)
                } else {
                    res.status.should.equal(200);
                    console.debug(res.body)
                }
                done()
            })
    }).timeout(1000);
    it('should GET 401 Response', (done) => {
        chai.request(server)
            .delete(`${config.URL_PREFIX}/todo/${todoId}`)
            .end((err, res) => {
                if (err) {
                    console.error(err)
                } else {
                    res.status.should.equal(401);
                    console.debug(res.body);
                }
                done()
            })
    }).timeout(1000);
    it('should GET 400 request', (done) => {
        chai.request(server)
            .delete(`${config.URL_PREFIX}/todo/undefined`)
            .set('Access-Token', token)
            .end((err, res) => {
                if (err) {
                    console.error(err)
                } else {
                    res.status.should.equal(400)
                    console.debug(res.body);
                }
                done()
            })
    }).timeout(1000);
    it('should GET 400 request', (done) => {
        chai.request(server)
            .delete(`${config.URL_PREFIX}/todo/100`)
            .set('Access-Token', token)
            .end((err, res) => {
                if (err) {
                    console.error(err)
                } else {
                    res.status.should.equal(400);
                    console.debug(res.body);
                }
                done()
            })
    }).timeout(1000)
});
