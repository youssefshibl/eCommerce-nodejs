![background](https://github.com/youssefshibl/eCommerce-nodejs/assets/63800183/c3402a1f-8653-4b14-9e87-b2adec4426de)

# 🛒 Ecommerce system API using Express js + Mongoose

## 🐸 Features
* jwt auth
* cart
* order
* product
* email verification

## 🥽 User

📝 `post` method `users/register`  make new user 
```json 
{
  "name":"youssef1",
  "email":"youssef1@gmail.com",
  "password":"123456",
  "phone":"01125152"
}
```
✔️ make user successfuly
```json 
{
  "name": "youssef1",
  "email": "youssef1@gmail.com",
  "email_verify": false,
  "isAdmin": false,
  "street": "",
  "apartment": "",
  "zip": "",
  "city": "",
  "country": "",
}
```
❌ type of error can maked 
```json 
{
  "success": false,
  "message": "this email is exits"
}
```
📝 `post` method `users/login` login `(jwt auth)`
```json
{
  "email": "youssef1@gmail.com",
  "password": "1234565"
}
```
✔️ make login successfuly
```json
{
  "user": "youssef1@gmail.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDkxYTc1MDg2YTdiNDRjNWFlOWQxNWYiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjg3MjY3NTAyLCJleHAiOjE2ODczNTM5MDJ9.gcBOg7C1Axh-DrA4GboyNXkuBr0PmpjslyS3iPN7hco"
}
```
❌ type of error can maked 
```json
{
  "success": false,
  "message": "email or password may be not correrct"
}
```
📝 `get` method `users/getuser/:id` should be `admin` & `auth` get all info of user by id 
✔️ make  successfuly
```jons
{
  "sucess": true,
  "user": {
    "_id": "6491cb7b71c6d222c8abf2fe",
    "name": "youssef1",
    "email": "youssef1@gmail.com",
    "email_verify": false,
    "isAdmin": false,
    "street": "",
    "apartment": "",
    "zip": "",
    "city": "",
    "country": "",
    "__v": 0
  }
}
```
❌ type of error can maked 
```json 
{
  "sucess": false,
  "message": "user not found"
}
```
```json 
{
  "success": false,
  "message": "this id is not valid"
}
```
📝 `get` method `users/me` get info of me 

✔️ make successfuly
```json
{
  "success": true,
  "data": {
    "_id": "6491cb7b71c6d222c8abf2fe",
    "name": "youssef1",
    "email": "youssef1@gmail.com"
  }
}
```
❌ type of error can maked 
```json
{
  "success": false,
  "message": "you should verifyt you acount",
  "code": 111
}
```
📝 `delete` method `users/:id` should be `admin` & `auth` delete user  by id 
✔️ make  successfuly
```jons
{
  "sucess": true,
  "message": "use deleted success"
}
```
❌ type of error can maked 
```json 
{
  "sucess": false,
  "message": "user not found"
}
```
```json 
{
  "success": false,
  "message": "this id is not valid"
}
```
📝 `get` method `users/resendcode` send code of verification to your mail box
✔️ make  successfuly
```json
{
  "success": true,
  "message": "check you email we send code to youssef1@gmail.com"
}
```
📝 `post` method `users/verifyemail` send code to verify you email
✔️ make  successfuly
```json
{
  "success": true,
  "data": {
    "_id": "6491a75086a7b44c5ae9d15f",
    "name": "youssef1",
    "email": "youssef1@gmail.com",
    "email_verify": true,
    "isAdmin": false,
    "street": "",
    "apartment": "",
    "zip": "",
    "city": "",
    "country": "",
    "__v": 0
  }
}
```



