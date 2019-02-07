const mongoose = require('mongoose');
const { resolve } = require('path');
const glob = require('glob');
const { DEBUG } = require('./../../config');

mongoose.Promise = global.Promise;

exports.Connect = (db) => {
    let maxConnectTimes = 0;
    mongoose.set('useCreateIndex', true);
    mongoose.set('debug', DEBUG);
    mongoose.connect(db, { useNewUrlParser: true });
    mongoose.connection.on('disconnect', ()=>{
        maxConnectTimes++
        if(maxConnectTimes < 5){
            mongoose.connect(db, { useNewUrlParser: true })
        }else{
            throw new Error("数据库挂了~")
        }
    });
    mongoose.connection.on('error', (err)=>{
        maxConnectTimes++
        if(maxConnectTimes < 5){
            mongoose.connect(db, { useNewUrlParser: true })
        }else{
            throw new Error("数据库连接出错了~")
        }
    });
    mongoose.connection.on('open', ()=>{
        console.log('MongoDB connected')
    });
};

exports.InitSchema = () => {
    glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
};
