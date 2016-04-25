PASS=$(shell echo $$LAURADOCKERPASSWORD)

clean: 
	docker rmi laurafitz/apitest; docker rmi laurafitz/api

build-test:
	docker build -f Dockerfile-test -t laurafitz/apitest .

test: build-test
	docker run --rm -v $(shell pwd)/src:/api laurafitz/apitest

build:
	docker build -t laurafitz/api .

release: build
	docker push laurafitz/api
	