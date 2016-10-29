/*
PREPARATION PHASE:
1) ensure if the current context is the npm project (the package.json file exists)
2) run unit-tests (npm run unit-tests)
3) run e2e-tests (npm run e2e-tests)
4) ensure that the current branch is a feature branch
5) ensure that there is 1 or more commit in the current feature branch
6) ensure that the working tree is clean
7) ensure that there is CHANGELOG.md file in the current context
8) ask for the changelog description
9) ask which version to update (major, minor or patch?)

JOB PHASE:
1) update the package.json version (major, minor or patch).
2) add an entry to the CHANGEGLOG.md file
	<header>
		<h2>{{date, time}}</h2>
		<h3>
			{{version}}
			<small>({{'major' | 'minor' | 'patch'}} release)</small>
		</h3>
	</header>
	<p>
		{{description}}
	</p>
	<footer>
		<p>feature: {{branchName}}</p>
		<p>author: {{author}}</p>
	</footer>
3) commit package.json and CHANGELOG.md changes with the message:
Publishing: {{version}} - {{description}}
4) pubish the feature branch
5) Create a pull request
*/

require('./lib/validate')(successfulValidation, failedValidation);

function successfulValidation() {
    require('./lib/input')(function(input) {
        console.log(input);
    });
}

function failedValidation(error) {
    console.error(error);
    process.exit(1);
}
