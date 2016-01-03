PASS=$(shell echo $$LAURADOCKERPASSWORD)

clean:
	docker rmi fyp/apitest; docker rmi fyp/api

build-test:
	docker build -f Dockerfile-test -t fyp/apitest .

test: build-test
	docker run --rm -v $(shell pwd):/app fyp/apitest spec

build:
	docker build -t fyp/api .

release: build
	docker login -e laurafitzgeraldsemail@gmail.com -u laura -p $(PASS)  docker-laura.ammeon.com:80 && docker tag -f fyp/api docker-laura.ammeon.com:80/fyp/api && docker push docker-laura.ammeon.com:80/fyp/api

run local: build
	docker run -p 80:9292 fyp/api
