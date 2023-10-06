install: install-deps
	npx simple-git-hooks

run:
	node bin/gendiff.js file1.json file2.json

install-deps:
	npm ci

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

publish:
	npm publish --dry-run

lint:
	npx eslint .

