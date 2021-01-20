# REST API for the Mesa Inc. case

The only thing you need to run the application is just docker and docker-composer

## Install
  To install you just need run this command on bash

```bash
docker-compose up --build -d
```

## Run the migrations
First you need to access the container
```bash
docker exec -it Adonis sh
```

Then you need to run de command for migration
```bash
node ace migration:run
```
## Run the tests
To run the tests you can in `japaFile.ts` set the database for test or just run in the development database.</br>
Then you set up the database, access the container and run the following command
```bash
yarn test
```
# ENDPOINTS

The endpoints for the API<br>
In development: ```http://localhost:3333```<br>
In production: ```https://mesa-case.herokuapp.com```

If you wanna checkout on postman documenter here's the link: https://documenter.getpostman.com/view/14225137/TVzVjGYZ

## Store new user

### Request

`POST /v1/client/users` + Authentication Bearer
```json
{
  "firstName": "Lavínia",
  "lastName": "Isabela",
  "email": "laviniaisabelaisisteixeira-97@moyageorges.com.br",
  "password": "oAX5RDg1pY"
}
```
### Response
```json
{
  "first_name": "Lavínia",
  "last_name": "Isabela",
  "email": "claviniaisabelaisisteixeira-97@moyageorges.com.br",
  "external_id": "3859957c-58d4-4c20-9a91-4c48d56c153b",
  "created_at": "2021-01-20T16:35:30.610+00:00",
  "updated_at": "2021-01-20T16:35:30.925+00:00"
}
```

## Update user's info

### Request
`PUT /v1/client/users` + Authentication Bearer
```json
{
  "firstName": "Lavínia",
  "lastName": "Isabela",
  "email": "laviniaisabelaisisteixeira-97@moyageorges.com.br",
  "oldPassword": "oAX5RDg1pY",
  "newPassword": "123456
}
```
### Response
```json
{
  "first_name": "Lavínia",
  "last_name": "Isabela",
  "email": "claviniaisabelaisisteixeira-97@moyageorges.com.br",
  "external_id": "3859957c-58d4-4c20-9a91-4c48d56c153b",
  "created_at": "2021-01-20T16:35:30.610+00:00",
  "updated_at": "2021-01-20T16:35:30.925+00:00"
}
```

## Show the user's info

### Request

`GET /v1/client/users/:id` + Authentication Bearer
### Response
```json
{
  "first_name": "Lavínia",
  "last_name": "Isabela",
  "email": "claviniaisabelaisisteixeira-97@moyageorges.com.br",
  "external_id": "3859957c-58d4-4c20-9a91-4c48d56c153b",
  "created_at": "2021-01-20T16:35:30.610+00:00",
  "updated_at": "2021-01-20T16:35:30.925+00:00"
}
```

## SignIn

### Request

`POST /v1/client/auth/signin`
```json
{
  "email": "claviniaisabelaisisteixeira-97@moyageorges.com.br",
  "password": "oAX5RDg1pY"
}
```
### Response
```json
{
  "type": "bearer",
  "token": "Mw.30Av5Q95m1jw9kB1HVJ1Nf2ReanSzhqx5AXD6ErKCH70hMSUSOleELeCq3Zh",
  "expires_at": "2021-01-27T16:41:10.722+00:00"
}
```

## Logout
### Request

`POST /v1/client/auth/logout`  + Authentication Bearer

### Response
No response body<br><br>
## List all spots

### Request

`GET /v1/client/spots` + Authentication Bearer
#### Query params accepted
    - list = true or nothing (response in alphabetic order)
    - own = true or nothing (response with his own spots registered)
    - latitude = number corresponding the latitude (response per range) *
    - longitude = number corresponding the longitude (response per range) *
    - page = number for the page
    - limit = limit for max item per page
*only needed if there is no list param
### Response
```json
{
  "meta": {
    "total": 0,
    "per_page": 10,
    "current_page": 1,
    "last_page": 1,
    "first_page": 1,
    "first_page_url": "/?page=1",
    "last_page_url": "/?page=1",
    "next_page_url": null,
    "previous_page_url": null
  },
  "data": [
    {
      "external_id": "5ccba86c-cbe1-40da-9057-7ae2e185e5d4",
      "name": "Liceu de Nobrega",
      "latitude": "-7.982469",
      "longitude": "-34.860401",
      "created_at": "2021-01-20T16:38:53.114+00:00",
      "updated_at": "2021-01-20T16:39:37.948+00:00",
      "user": {
        "external_id": "3859957c-58d4-4c20-9a91-4c48d56c153b",
        "first_name": "Augusto",
        "last_name": "César",
        "email": "caiofsr@gmail.com",
        "created_at": "2021-01-20T16:35:30.610+00:00",
        "updated_at": "2021-01-20T16:36:26.454+00:00"
      },
      "ratings": []
    }
  ]
}
```

## Show a spot

### Request

`GET /v1/client/spots/:id` + Authentication Bearer
### Response
```json
{
  "external_id": "5ccba86c-cbe1-40da-9057-7ae2e185e5d4",
  "name": "Liceu de Nobrega",
  "latitude": "-7.982469",
  "longitude": "-34.860401",
  "created_at": "2021-01-20T16:38:53.114+00:00",
  "updated_at": "2021-01-20T16:39:37.948+00:00",
  "user": {
    "external_id": "3859957c-58d4-4c20-9a91-4c48d56c153b",
    "first_name": "Augusto",
    "last_name": "César",
    "email": "caiofsr@gmail.com",
    "created_at": "2021-01-20T16:35:30.610+00:00",
    "updated_at": "2021-01-20T16:36:26.454+00:00"
  },
  "ratings": []
}
```

## Register a new spot

### Request

`POST /v1/client/spots` + Authentication Bearer
```json
{
  "name": "Terminal Integrado PE-15",
  "latitude": -7.9838562,
  "longitude": -34.8574941
}
```
### Response
```json
{
  "name": "Terminal Integrado PE-15",
  "latitude": -7.9838562,
  "longitude": -34.8574941,
  "external_id": "5ccba86c-cbe1-40da-9057-7ae2e185e5d4",
  "created_at": "2021-01-20T16:38:53.114+00:00",
  "updated_at": "2021-01-20T16:38:53.114+00:00"
}
```
## Change a spot

### Request

`PUT /v1/client/spots/:id` + Authentication Bearer
```json
{
  "name": "Terminal Integrado PE-15",
  "latitude": -7.9838562,
  "longitude": -34.8574941
}
```
### Response
```json
{
  "name": "Terminal Integrado PE-15",
  "latitude": -7.9838562,
  "longitude": -34.8574941,
  "external_id": "5ccba86c-cbe1-40da-9057-7ae2e185e5d4",
  "created_at": "2021-01-20T16:38:53.114+00:00",
  "updated_at": "2021-01-20T16:38:53.114+00:00"
}
```
## Delete a spot

### Request

`DELETE /v1/client/spots/:id` + Authentication Bearer
### Response
No response body<br><br>

## Register a new rating for a spot

### Request

`POST /v1/client/ratings/:spot_id` + Authentication Bearer
```json
{
  "comment": "Um comentário",
  "rate": 5
}
```

### Response
```json
{
  "comment": "Um comentário",
  "rate": 5,
  "external_id": "e9c342a0-f56b-49f8-9378-2011b3f5eac1",
  "created_at": "2021-01-20T16:40:15.666+00:00",
  "updated_at": "2021-01-20T16:40:15.666+00:00"
}
```
## List all ratings for a spot
### Request

`GET /v1/client/ratings/:spot_id` + Authentication Bearer
#### Query params accepted
    - page = number for the page
    - limit = limit for max item per page
### Response
```json
{
  "meta": {
    "total": 0,
    "per_page": 10,
    "current_page": 1,
    "last_page": 1,
    "first_page": 1,
    "first_page_url": "/?page=1",
    "last_page_url": "/?page=1",
    "next_page_url": null,
    "previous_page_url": null
  },
  "data": [
    {
      "comment": "Um comentário",
      "rate": 5,
      "external_id": "e9c342a0-f56b-49f8-9378-2011b3f5eac1",
      "created_at": "2021-01-20T16:40:15.666+00:00",
      "updated_at": "2021-01-20T16:40:15.666+00:00"
    }
  ]
}
```

