const { resolve } = require('path');
const glob = require('glob');

exports.InitSchema = () => {
    glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
};
