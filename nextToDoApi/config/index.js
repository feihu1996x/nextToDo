const PORT = 8086;
const DEBUG = 'production' !== process.env.NODE_ENV;
// const URL_PREFIX = '';
const URL_PREFIX = '/nextToDoApi';

const MONGO_HOST = '127.0.0.1';
const MONGO_PORT = 27017;
const MONGO_DB = 'test' === process.env.NODE_ENV ? 'nextToDoTest' : 'nextToDo';
const MONGODB = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;

const SALT_WORK_FACTOR = 10;
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 2 * 60 * 60 * 1000;

const AUTH_CHECKED_URLS = [
    '/todo',
];

module.exports = {
    PORT,
    DEBUG,
    URL_PREFIX,
    MONGODB,
    SALT_WORK_FACTOR,
    MAX_LOGIN_ATTEMPTS,
    LOCK_TIME,
    AUTH_CHECKED_URLS
};
