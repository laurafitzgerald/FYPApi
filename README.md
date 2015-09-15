[![build status](http://ci-laura.ammeon.com/projects/1/status.png?ref=master)](http://ci-laura.ammeon.com/projects/1?ref=master)

## To run tests

```
make test
```

This will rebuild the test image if dependencies have changed and then run the tests using mocha


## Manually push a release
```
make release
```

This will push a new untagged image (not recommended) makefile should be updated to specify a tag


## Remove images
```
make clean
```

## This will remove local copies of the build and production images

Build
```
make build
```

This will build a production images locally