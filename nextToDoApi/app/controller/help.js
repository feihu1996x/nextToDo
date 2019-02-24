const api = require('../api');
const { ResponseJson } = require('../lib').Response;

exports.getHelp = async (req, res) => {
    try {
        const data = await api.Help.getHelp();
        return ResponseJson(res, data);
    } catch (error) {
        console.error(error);
        return ResponseJson(res, [], 'something is wrong', error.status || 500);
    }
};
