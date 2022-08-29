## Made With NestJS
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Installation

```bash
$ npm install
```

## Setup database w/ docker
```bash
$ docker-compose up
# OR
$ docker run --name mongodb -d -p 27017:27017 mongo
```
## Running the app

```bash

# development
$ npm run start

# watch mode
$ npm run start:dev

```

## App Flow


### Create account & log
[POST]
```js
uri: localhost:3001/auth/signup
body: 
{
    "fullname": String,
    "email": String,
    "dob":" String,
    "password": String
}
response: AuthToken,RefreshToken
```
### Login
[POST]
```js
uri: localhost:3001/auth/login
body:
{
"email": String,
"password": String(it has to be strong)
}
response: AuthToken,RefreshToken
```
### Create Product 
[POST]
```js
uri: localhost:3001/products/create
body:
{
    "name": String,
    "price":Float
}
response:
{
    "_id":  String,
    "name":  String,
    "price": Float,
    "createdAt":  String,
    "updatedAt":  String
}
```
### Get Products ( With pagination!)
[GET]
```js
uri: localhost:3001/products/{page}/{itemsPerPage} // ex for the first page with only 3 products : localhost:3001/products/1/3 
response:
[
    {
        "_id": String,
        "name":  String,
        "price": float,
        "createdAt":  String,
        "updatedAt":  String
    },
    {
        "_id":  String,
        "name":  String,
        "price": Float,
        "createdAt":  String,
        "updatedAt":  String
    },
   
]
```
### Create Order
[POST]
```js
uri: localhost:3001/orders/create
body:
{
 "products":[ String ( product ids) ]
}
response:
{
    "_id": String,
    "products": [
      String (product ids),
      String (product ids)
    ],
    "userId": String,
    "processing": Boolean,
    "price":Float,
    "createdAt": String,
    "updatedAt": String
}
```
### Get  Orders ( With pagination!)
[GET]
```js
uri: localhost:3001/orders/{page}/{itemsPerPage} // ex for the first page with only 3 products : localhost:3001/orders/1/3 
response:
[
     "_id": String,
    "products": [
      String (product ids),
      String (product ids)
    ],
    "userId": String,
    "processing": Boolean,
    "price":Float,
    "createdAt": String,
    "updatedAt": String
    },
    {
      "_id": String,
    "products": [
      String (product ids),
      String (product ids)
    ],
    "userId": String,
    "processing": Boolean,
    "price":Float,
    "createdAt": String,
    "updatedAt": String
    }
]
```
### Create Payment Method
[POST]
```js
uri: localhost:3001/payment-types/create
body:
{
    "name":String,
    "action":ENUM ACTIONS = "setDiscount" || "sendMail"
}
response:
{
    "name": String,
    "action": ENUM ACTIONS,
    "_id": String,
    "createdAt": String,
    "updatedAt": String
}
```
### Get Payment Methods ( With pagination!)
[GET]
```js
uri: localhost:3001/payment-types/{page}/{itemsPerPage} // ex for the first page with only 3 products : localhost:3001/payment-types/1/3 
response:
[
   { "name": String,
    "action": ENUM ACTIONS,
    "_id": String,
    "createdAt": String,
    "updatedAt": String
    },
    {
     "name": String,
    "action": ENUM ACTIONS,
    "_id": String,
    "createdAt": String,
    "updatedAt": String
    }
]
```
### payOrder
[POST]
```js
uri:localhost:3001/orders/pay
body:
{
 orderId:String
 paymentMethodId:String
}
response:
{
 sucess:boolean
}

```

 
### Card Creation Enum description

Whenever you create a card you have to send a action, this action can be "setDiscount" or "sendMail" on set discount when paying the order value gets 10% discount on send Mail, a "email is sent" to the user 

## Info

Admin User is created when app starts if theres no admin in DB , mail:ADM@ADM.com pass: password123$

Authorization : " Bearer [TOKEN]" 

- Author - [Tiago Moreira](https://github.com/D45putspin)



