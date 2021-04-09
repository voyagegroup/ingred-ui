.PHONY: install test lint changelog release_version publish

SEMVER :=
RELEASE_VERSION :=
GITHUB_TOKEN :=
NPM_TOKEN :=

install:
ifeq ($(CI), true)
	yarn install --frozen-lockfile
else
	yarn install
endif

build:
	yarn build

test:
	yarn test

lint:
	yarn lint

changelog:
	github_changelog_generator \
		--user voyagegroup \
		--project ingred-ui \
		--exclude-labels release \
		--future-release v${RELEASE_VERSION} \
		--token ${GITHUB_TOKEN}

release_version:
	npm config set git-tag-version false
	npm version ${RELEASE_VERSION}

publish: build
ifeq ($(CI), true)
	git config --global user.email ingred-ui@voyagegroup.com
	git config --global user.name INGRED-UI
endif
	@echo //registry.npmjs.org/:_authToken=${NPM_TOKEN} > .npmrc
	npm publish
