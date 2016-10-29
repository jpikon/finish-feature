var fs = require('fs');

function noop() {}

function requireSafe(file, success, error) {
    try {
        var file = require(process.cwd() + file);
        (success || noop)(file);
    } catch(e) {
        (error || noop)(e);
    }
}

function checkIfExists(file, success, error) {
    fs.exists(process.cwd() + file, function(exists) {
        return exists ? (success || noop)() : (error || noop)();
    });
}

module.exports = {
    noop: noop,
    requireSafe: requireSafe,
    checkIfExists: checkIfExists
};
