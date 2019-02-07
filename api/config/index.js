const PORT = 8086;

const MONGO_HOST = '127.0.0.1';
const MONGO_PORT = 27017;
const MONGO_DB = 'nextToDo';
const MONGODB = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;

// const URL_PREFIX = '';
const URL_PREFIX = '/nextToDoApi';

const DEBUG = 'production' !== process.env.NODE_ENV;

const AUTH_URLS = [
    '/todo'
];

module.exports = {
    PORT,
    MONGO_HOST,
    MONGO_DB,
    MONGO_PORT,
    MONGODB,
    URL_PREFIX,
    DEBUG,
    AUTH_URLS,
    router: require('./routes'),
};
