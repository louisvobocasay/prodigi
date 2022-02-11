## Project structure
online-festival-fullservices is built as a monorepo. core is a library interacts directly with database. Api app calls provided methods from core.

```
|--apps
    |--api
        |--src
        |   |--constants
        |   |--decorators
        |   |--env
        |   |--guards
        |   |--interceptors
        |   |--models
        |   |--modules
        |   |   |--auth
        |   |   |--media
        |   |   |   |--dto
        |   |   |   |--enum
        |   |   |   |--interfaces
        |   |   |   |--services
        |   |   |       |--media-upload
        |   |   |   |--media.controller.ts
        |   |   |   |--media.module.ts
        |   |   |--products
        |   |   |   |--dto
        |   |   |   |--enum
        |   |   |   |--interfaces
        |   |   |   |--services
        |   |   |   |   |--products-create
        |   |   |   |   |--products-find
        |   |   |   |   |--products-find-one
        |   |   |   |   |--products-update
        |   |   |   |--admin-products.controller.ts
        |   |   |   |--products.controller.ts
        |   |   |   |--public-products.controller.ts
        |   |   |   |--products.module.ts
        |   |   |--users
        |   |   |   |--dto
        |   |   |   |--enum
        |   |   |   |--interfaces
        |   |   |   |--services
        |   |   |   |   |--users-create
        |   |   |   |   |--users-find
        |   |   |   |   |--users-find-one
        |   |   |   |   |--users-update
        |   |   |   |--admin-users.controller.ts
        |   |   |   |--users.controller.ts
        |   |   |   |--public-users.controller.ts
        |   |   |   |--users.module.ts
        |   |--pipes
        |   |--app.controller.ts
        |   |--app.module.ts
        |   |--app.service.ts
        |   |--main.ts
        |--test
|--libs
|   |--core
|   |   |--src
|   |   |   |--constants
|   |   |   |--env
|   |   |   |--filters
|   |   |   |--i18n
|   |   |   |--mirgrations
|   |   |   |--models
|   |   |   |--modules
|   |   |   |   |--core-brands
|   |   |   |   |   |--entities
|   |   |   |   |   |--enum
|   |   |   |   |   |--interfaces
|   |   |   |   |   |--services
|   |   |   |   |   |   |--core-brands-create
|   |   |   |   |   |   |--core-brands-find
|   |   |   |   |   |   |--core-brands-find-one
|   |   |   |   |   |   |--core-brands-update
|   |   |   |   |   |--core-brands.module.ts
|   |   |   |   |   |--index.ts
|   |   |   |   |--core-helper-redis
|   |   |   |   |   |--enum
|   |   |   |   |   |--interfaces
|   |   |   |   |   |--core-helper-redis.module.ts
|   |   |   |   |   |--index.ts
|   |   |   |   |--core-helper-storage
|   |   |   |   |   |--enum
|   |   |   |   |   |--interfaces
|   |   |   |   |   |--providers
|   |   |   |   |   |--services
|   |   |   |   |   |   |--core-helper-storage-base
|   |   |   |   |   |   |--core-helper-storage-upload
|   |   |   |   |   |--core-helper-storage.module.ts
|   |   |   |   |   |--index.ts
|   |   |   |   |--core-media
|   |   |   |   |   |--entities
|   |   |   |   |   |--enum
|   |   |   |   |   |--interfaces
|   |   |   |   |   |--services
|   |   |   |   |   |   |--core-media-create
|   |   |   |   |   |   |--core-media-find
|   |   |   |   |   |   |--core-media-find-one
|   |   |   |   |   |   |--core-media-update
|   |   |   |   |   |--core-media.module.ts
|   |   |   |   |   |--index.ts
|   |   |   |   |--core-product-types
|   |   |   |   |   |--entities
|   |   |   |   |   |--enum
|   |   |   |   |   |--interfaces
|   |   |   |   |   |--services
|   |   |   |   |   |   |--core-product-types-find
|   |   |   |   |   |   |--core-product-types-find-one
|   |   |   |   |   |   |--core-product-types-update
|   |   |   |   |   |--core-product-types.module.ts
|   |   |   |   |   |--index.ts
|   |   |   |   |--core-products
|   |   |   |   |   |--entities
|   |   |   |   |   |--enum
|   |   |   |   |   |--interfaces
|   |   |   |   |   |--services
|   |   |   |   |   |   |--core-products-create
|   |   |   |   |   |   |--core-products-find
|   |   |   |   |   |   |--core-products-find-one
|   |   |   |   |   |   |--core-products-update
|   |   |   |   |   |--core-products.module.ts
|   |   |   |   |   |--index.ts
|   |   |   |   |--core-user-wishlist
|   |   |   |   |   |--entities
|   |   |   |   |   |--enum
|   |   |   |   |   |--interfaces
|   |   |   |   |   |--services
|   |   |   |   |   |   |--core-user-wishlist-create
|   |   |   |   |   |   |--core-user-wishlist-find
|   |   |   |   |   |   |--core-user-wishlist-find-one
|   |   |   |   |   |   |--core-user-wishlist-update
|   |   |   |   |   |--core-user-wishlist.module.ts
|   |   |   |   |   |--index.ts
|   |   |   |   |--core-users
|   |   |   |   |   |--entities
|   |   |   |   |   |--enum
|   |   |   |   |   |--interfaces
|   |   |   |   |   |--services
|   |   |   |   |   |   |--core-users-create
|   |   |   |   |   |   |--core-users-find
|   |   |   |   |   |   |--core-users-find-one
|   |   |   |   |   |   |--core-users-update
|   |   |   |   |   |--core-users.module.ts
|   |   |   |   |   |--index.ts
|   |   |   |--pipes
|   |   |   |--services
|   |   |   |--utils
|   |   |   |--core.module.ts
|   |   |   |--core.service.ts
|   |   |   |--index.ts
```

## Environment installation 
### MacOS

#### Redis
Installation is simpler using Homebrew. Run:
```
$ brew install redis
```
Then run
```
$ brew services start redis
```
To make Redis start automatically, and restart when the computer reboots. You can also start it manually using:
```
$ redis-server /usr/local/etc/redis.conf
```

#### On Linux Ubuntu
You'll need to run:
```
$ sudo apt-get install redis-server
```

`Once it’s started, Redis listens on port 6379` 
## Installation

```bash
$ npm install
```

`Project also needs to install PostgreSQL. Installation link: https://www.postgresqltutorial.com/install-postgresql-macos/`


## Running the app

```bash
# development
$ npm run start or yarn install

# build core before starting development or build
$ npm run build core

# watch mode
$ npm run api

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

