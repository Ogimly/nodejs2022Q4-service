# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/Ogimly/nodejs2022Q4-service.git
```

## Installing NPM modules

```
git checkout develop-log-and-auth
npm install
```

## Environment

Create `.env` file using `.env.example` as a pattern.

You can change default port (4000 as default) and db properties.

## Running application in Docker container

```
docker-compose up
```

or

```
npm run docker:start
```

## Swagger

After starting the app on port (4000 as default) you can open in your browser OpenAPI documentation by typing http://localhost:4000/doc/.

For authorization you can press `Authorize` button
![image](https://user-images.githubusercontent.com/101447709/221406541-c608914b-e46b-4795-83d6-b668489a8c0d.png)

and type your access token (without `Bearer`!)
![image](https://user-images.githubusercontent.com/101447709/221406591-59c3e0d6-231e-4e76-af01-62762b2d2e96.png)

Access token you can receive after login
![image](https://user-images.githubusercontent.com/101447709/221406750-563f84b7-ac37-4cc0-8f53-0309be74328e.png)

## Logging

Logs are written to `logs` folder and additionally errors are written to `errors` folder, the structure of folders is as follows:
![image](https://user-images.githubusercontent.com/101447709/221407234-8c23a8d7-86d0-414c-89d1-53fed90466ce.png)

Logger parameters setting in `.env` file, for example:

`LOG_LEVEL=5`, values: `0` - only `log` event, `1` + `error`, `2` + `warn`, `3` +`debug`, `4` and more - all log events

`WRITE_LOG_FILE=1`, values: `1` - write logs to file, `0` - no

`WRITE_ERROR_FILE=1`, values: `1` - write errors to separate file, `0` - no

`MAX_FILE_SIZE=100`, max file size for log file rotation (kB)

## Scanning

To run npm script for vulnerabilities scanning:

```
npm run docker:scan
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
