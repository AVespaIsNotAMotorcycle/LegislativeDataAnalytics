FORCE:

dev_env: FORCE
	npm install

tests: FORCE
	npm run test

github_staging:
	-git commit -a
	git push origin staging

staging: tests github_staging
