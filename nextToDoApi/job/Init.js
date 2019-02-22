const { resolve } = require('path');
const glob = require('glob');

exports.InitJobs = () => {
    glob.sync(resolve(__dirname, './task', '**/*.js')).forEach(require);
};
