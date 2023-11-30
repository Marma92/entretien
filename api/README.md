# Project Name

## Description
A simple API project built with Express and TypeScript.

## Installation
Install dependencies: `npm install`

## Usage
### Development
To run the project in development mode with automatic restart on file changes, use the following command:

```bash
npm start
```

This command uses `tsup-node` to transpile and bundle TypeScript code and starts the server with nodemon.

### Build
To build the project for production, use the following command:

```bash
npm run build
```

This command transpiles and bundles the TypeScript code into the `dist` directory.

### Start
To start the server in production mode, use the following command:

```bash
node dist/index.js
```
