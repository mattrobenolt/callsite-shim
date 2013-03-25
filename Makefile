BRANCH = $(shell git rev-parse --short --abbrev-ref HEAD)
TEST = test/index.html

REPORTER = dot


develop: update-submodules
	npm install .

update-submodules:
	git submodule init
	git submodule update

docs:
	cd docs; $(MAKE) html

docs-live:
	while true; do \
		sleep 2; \
		$(MAKE) docs; \
	done

test:
	@./node_modules/.bin/jshint --verbose .
	@./node_modules/.bin/mocha-phantomjs -R ${REPORTER} ${TEST}

PORT = 8888
runserver:
	python -m SimpleHTTPServer ${PORT}

clean:
	rm -rf build
	rm -rf docs/html

install-hooks:
	cp -rfp hooks/* .git/hooks

.PHONY: develop update-submodules docs docs-live test clean runserver install-hooks
