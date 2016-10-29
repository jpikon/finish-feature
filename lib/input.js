var prompt = require('prompt');

var promptSchema = {
    properties: {
        version: {
            pattern: /^[0-2]$/,
            description: 'Which version you want to update? (0 - Patch, 1 - Minor, 2 - Major)',
            message: '0 - Patch, 1 - Minor, 2 - Major',
            required: true
        },
        description: {
            description: 'Description of what has been changed',
            required: true
        }
    }
};

prompt.message = '';

module.exports = function(callback) {
    prompt.start();
    prompt.get(promptSchema, function (err, result) {
        if (result) {
            callback(result);
        }
    });
}
