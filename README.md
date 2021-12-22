# Spatulafoods Api and Admin

This project is an admin portal and graphql api for spatulafoods.

## Requirements

- [Docker](https://docs.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/gettingstarted/)

```zsh
# Start the database in the foreground
docker-compose up

## Start the database in the background
docker-compose up -d
```

## Install the dependencies

```zsh
yarn install
```

## Apply the schema

```zsh
yarn db:push
```

## Seed the data _optional_

```zsh
yarn db:seed
```

## Starting the server

```zsh
yarn dev
```

## Building for production

```zsh
yarn build
```

## Starting the server in production

Keep in mind you must build the app first

```zsh
yarn start
```

## Generating types with [`Graphql Code Generator`](https://www.graphql-code-generator.com/)

```zsh
yarn codegen
```
