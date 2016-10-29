var nodegit = require('nodegit-flow');
var q = require('q');
var helpers = require('./helpers');

//
// Ensure that the current working directory is a npm project
//
function checkNpmProject() {
    var deferred = q.defer();
    helpers.requireSafe('/package.json', deferred.resolve, function() {
        deferred.reject('No package.json file was found in the current working directory.');
    });
    return deferred.promise;
}

//
// Ensure that the current working directory contains CHANGELOG.md file
//
function checkChangelog() {
    var deferred = q.defer();
    helpers.checkIfExists('/CHANGELOG.md', deferred.resolve, function() {
        deferred.reject('No CHANGELOG.md file was found in the current working directory.');
    });
    return deferred.promise;
}

//
// Ensure that the current working directory is the Git repository.
//
function checkGitProject() {
    var deferred = q.defer();
    nodegit.Repository
        .open(process.cwd())
        .then(deferred.resolve)
        .catch(function(err) {
            deferred.reject('Git is not initialized in the current working directory');
        });
    return deferred.promise;
}

//
// Ensure that the current working directory is the Gitflow project.
//
function checkGitflowProject() {
    var deferred = q.defer();
    checkGitProject().then(function(repository) {
        nodegit.Flow.isInitialized(repository).then(function(isInitialized) {
            if (!isInitialized) {
                deferred.reject('Git-flow is not initialized in the current working directory');
            } else {
                deferred.resolve();
            }
        });
    });
    return deferred.promise;
}

//
// Ensure that the current working branch is a feature branch
//
function checkFeatureBranch() {
    var deferred = q.defer();
    checkGitProject().then(function(repository) {
        repository.getCurrentBranch().then(function(branch) {
            if (branch.shorthand().indexOf('feature/') !== 0) {
                deferred.reject('The current branch is not the feature branch.');
            } else {
                deferred.resolve();
            }
        });
    });
    return deferred.promise;
}

//
// Ensure that the current branch contains one or more commits
//
function checkCommits() {
    var deferred = q.defer();
    checkGitProject().then(function(repository) {
        repository.getCurrentBranch().then(function(branch) {
            repository.getBranchCommit(branch.shorthand()).then(function(commits) {
                var history = commits.history();
                history.on('end', function(resolvedCommits) {
                    if (resolvedCommits.length === 0) {
                        deferred.reject('The current feature branch contains no commits.');
                    } else {
                        deferred.resolve();
                    }
                });
                history.start();
            });
        });
    });
    return deferred.promise;
}

//
// Run unit tests
//
function runUnitTests() {
    // NOT IMPLEMENTED YET
    return q.when(true);
}

//
// Run e2e tests
//
function runE2ETests() {
    // NOT IMPLEMENTED YET
    return q.when(true);
}

module.exports = function(success, error) {
    q.all([
        checkNpmProject(),
        checkChangelog(),
        checkGitProject(),
        checkGitflowProject(),
        // checkFeatureBranch(),
        checkCommits(),
        runUnitTests(),
        runE2ETests()
    ]).then(function() {
        success();
    }).catch(function(err) {
        error(err);
    });
};
