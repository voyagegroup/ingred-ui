.PHONY: install test lint release_version publish

RELEASE_VERSION ?=
GITHUB_TOKEN ?=
NPM_TOKEN ?=
OUTPUT_FILE ?= release_note.md

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

build:
	yarn build

check_changesets:
	yarn changeset status

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
