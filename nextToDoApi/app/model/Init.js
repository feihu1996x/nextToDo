const { resolve } = require('path');
const glob = require('glob');
const mongoose = require('mongoose');
const { DEBUG } = require('../../config');

exports.InitSchema = () => {
    glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
};

exports.Connect = (db) => {
    let maxConnectTimes = 0;
    return new Promise((resolve, reject) => {
        mongoose.set('useCreateIndex', true);
        mongoose.set('debug', DEBUG);
        mongoose.connect(db, { useNewUrlParser: true });
        mongoose.connection.on('disconnect', () => {
            maxConnectTimes ++;
            if (maxConnectTimes < 5) {
                mongoose.connect(db, { useNewUrlParser: true })
            } else {
                reject(new Error('mongodb connect failed'))
            }
        });
        mongoose.connection.on('error', (err) => {
            maxConnectTimes ++;
            if (maxConnectTimes < 5) {
                mongoose.connect(db, { useNewUrlParser: true })
            } else {
                reject(err)
            }
        });
        mongoose.connection.on('open', () => {
            console.debug('mongodb connected');
            resolve()
        });
    });
};
