const config = require('../../config');

exports.getHelp = async () => {
    return [
        {
            'link': {
                'rel': `GET ${config.URL_PREFIX}/todo`,
                'href': `${config.URL_PREFIX}/todo`,
                'title': `List of Todo`,
                'type': 'application/json',
            }
        },
        {
            'link': {
                'rel': `POST ${config.URL_PREFIX}/todo`,
                'href': `${config.URL_PREFIX}/todo`,
                'title': 'Create a Todo',
                'type': 'application/json',
            }
        },
        {
            'link': {
                'rel': `DELETE ${config.URL_PREFIX}/todo/:id`,
                'href': `${config.URL_PREFIX}/todo/:id`,
                'title': 'Delete a Todo',
                'type': 'application/json',
            }
        },
        {
            'link': {
                'rel': `POST ${config.URL_PREFIX}/user`,
                'href': `${config.URL_PREFIX}/user`,
                'title': 'User SignUp',
                'type': "application/json",
            }
        },
        {
            'link': {
                'rel': `PUT ${config.URL_PREFIX}/user`,
                'href': `${config.URL_PREFIX}/user`,
                'title': 'User SignIn',
                'type': 'application/json',
            }
        }
    ]
};