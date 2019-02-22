const api = require('../api');
const { ResponseJson } = require('../lib').Response;

exports.getHelp = async (req, res, next) => {
    const data = await api.Help.getHelp();
    return ResponseJson(res, [data]);
};
