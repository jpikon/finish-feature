function noop() {}

function requireSafe(file, success, error) {
    try {
        var file = require(process.cwd() + file);
        (success || noop)(file);
    } catch(e) {
        (error || noop)(e);
    }
}

module.exports = {
    noop: noop,
    requireSafe: requireSafe
};
