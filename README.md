## Setup frontend app
### Install dependencies

#### `npm install`

### Start project

#### `npm start`

## Configuring an oro-application to work via API

### 1. [Enable WebApi in back-office](https://doc.oroinc.com/api/enabling-api-feature/)

### 2. [Create private and public keys and move them into location specified in the OroOAuth2ServerBundle](https://doc.oroinc.com/bundles/platform/OAuth2ServerBundle/#bundle-docs-platform-oauth2-server-bundle-configuration)

#### [Installition guide](https://oauth2.thephpleague.com/installation/#generating-public-and-private-keys)

**After creating private and public keys, rename them and move them to the correct directory**

`project_dir/var/oauth_private.key`

`project_dir/var/oauth_public.key`

### 3. [Create OAuth Applications for front-office](https://doc.oroinc.com/user/back-office/customers/customer-user-oauth-app/#customer-user-oauth-app)

**Also might create [OAuth Applications for back-office](https://doc.oroinc.com/user/back-office/system/user-management/oauth-app/#oauth-applications)**

### 4. [Set up cors policy in config.yml file for authorization](https://doc.oroinc.com/bundles/platform/OAuth2ServerBundle/)
```
oro_oauth2_server: 
    authorization_server: 
        cors: 
            preflight_max_age: 6000 
            allow_origins: ['http://localhost:3000'] 
```
### 5. [Set up cors policy in config.yml file for request to front-office](https://doc.oroinc.com/backend/api/storefront/)
```
frontend_api: 
        cors: 
            allow_origins: 
                - 'http://localhost:3000' 
```

**Note: config.yml by default already contains frontend_api statement, so need to append cors configs there**


### 6. [Set up cors policy in config.yml file for request to back-office](https://doc.oroinc.com/backend/api/cors/)
```
oro_api: 
    cors: 
        allow_origins: 
            - 'http://localhost:3000'
```

### 7. Enable guest access in front-office
#### Configuration -> System -> type in search bar 'guest' -> enable guest access on each displayed page
#### Customers -> Customers User Roles -> edit role **Non-Authenticated Visitorsle**, edit shoppinglist permissions 