# Search API

It's an API for searching through a database of peoples names. As you do.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
docker
docker-compose
```

For active development

```
npm+node
```

### Installing

Build the containers

```
docker-compose build
```

Start the containers

```
docker-compose up
```

(OPTIONAL) Import a bunch of test data

```
docker-compose exec api npm run-script import-names
```

Browse the Swagger UI for basic documentation

```
http://localhost:3000/
```


## Running the tests

Run unit tests with

```
npm run-script test:unit
```

Run eslint with (Preferably your IDE should do this for you...)

```
npm run-script test:lint
```

There is also a WallabyJS config.



## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Using volumes instead of local paths because Windows+MongoDB+Local paths apparently do not mix.
* Using Cookies + JWTs because HttpOnly cookies are the securist of secure
* I accidentally started this as a local repo at the start. You can find the commit history for the local repo in COMMIT_HISTORY.txt!
