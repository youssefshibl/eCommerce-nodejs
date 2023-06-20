![background](https://github.com/youssefshibl/eCommerce-nodejs/assets/63800183/c3402a1f-8653-4b14-9e87-b2adec4426de)

# 🛒 Ecommerce system API using Express js + Mongoose

## 🐸 Features
* jwt auth
* cart
* order
* product
* email verifty

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
`post` method `users/login` login `(jwt auth)`

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

