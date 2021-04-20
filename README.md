## Auth Service

- Responsible for authenticate user, create account and logout.

```
Environment Variables:
SECRET= A word to encrypt and decrypt your password
RELATIONAL_DB_SERVICE_URL= Url + port to relational database service
```

### How to use

`npm install`
or 
`yarn install`

And
`yarn dev`
or
`npm run dev`

#### Endpoints
- /signup
POST
Parameters:
    - username: string
    - password: string
Return:
    - code: numeric
    - message: string

- /login
Parameters:
    - username: string
    - password: string
Return:
    - token: string
    - username: string

- /logout
Return:
    - token: null
