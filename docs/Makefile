help:
	@echo 'make -f ci.mk xxx'
	@echo '================='
	@awk -F ':|##' '/^[^\t].+?:.*?##/ { printf "\033[36m%-25s\033[0m %s\n", $$1, $$NF }' $(MAKEFILE_LIST)

init: ## Install dependencies
	yarn install

start: ## Start local server
	@yarn run start
