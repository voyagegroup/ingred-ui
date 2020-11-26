.PHONY: install test publish

SEMVER :=

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

publish: __req_semver build
	npm version ${SEMVER} -m "[ci skip] %s"
	git push origin master
	git push origin --tags
	npm publish
