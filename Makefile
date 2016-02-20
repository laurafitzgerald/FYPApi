PASS=$(shell echo $$LAURADOCKERPASSWORD)

build-test:
	docker build -f Dockerfile-test -t fyp/apitest

test: build-test
	docker run --rm -v $(shell pwd):/app gyp/apitest spec

build:
	docker build -t fyp/api .
