const config = require('../../config');

exports.getHelp = async () => {
    return {
        'link': {
            'rel': `GET ${config.URL_PREFIX}/todo`,
            'href': `${config.URL_PREFIX}/todo`,
            'title': `List of Todo`,
            'type': 'application/json',
        }
    }
};