.PHONY: install test changelog publish

SEMVER :=
RELEASE_VERSION :=
GITHUB_TOKEN :=

__req_semver:
ifeq ($(filter $(SEMVER),patch minor major),)
	$(error Require param SEMVER (patch or minor or major): $(SEMVER)))
endif

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
		--token ${FLUCT_MEMBER_GITHUB_TOKEN}

release_version:
	npm config set git-tag-version false
	npm version ${RELEASE_VERSION}

publish: __req_semver build
	npm publish
