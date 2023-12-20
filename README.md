![background](https://github.com/youssefshibl/eCommerce-nodejs/assets/63800183/c3402a1f-8653-4b14-9e87-b2adec4426de)

# 🛒 Ecommerce system API using Express js + Mongoose + Swagger

## 🐸 Features
*  user authentication (jwt)
* email verification
* user address
* categories
* products
* email verification
* cart
* orders
* payment

---
## Database Schema
![Screenshot from 2023-12-15 16-10-00](https://github.com/youssefshibl/eCommerce-nodejs/assets/63800183/d16bb239-9305-4611-9132-e27e76ac45ec)

i know that mongodb is not a relational database but i made it like this to make it easy to understand
---

### 🐸 User API
![Screenshot from 2023-12-21 00-59-57](https://github.com/youssefshibl/eCommerce-nodejs/assets/63800183/d14dec91-5e92-43e7-a62e-765385661537)
---

### 🐸 Address API
![Screenshot from 2023-12-21 01-00-13](https://github.com/youssefshibl/eCommerce-nodejs/assets/63800183/9a42c026-ce49-4825-b099-8b9b62417164)


### 🐸 Category API

![Screenshot from 2023-12-21 01-00-51](https://github.com/youssefshibl/eCommerce-nodejs/assets/63800183/68da5599-92b2-4ed7-a124-158b037e9168)

---
 ### 🐸 Product API

 ![Screenshot from 2023-12-21 01-00-26](https://github.com/youssefshibl/eCommerce-nodejs/assets/63800183/25aa2ed4-47f2-4f9d-8707-ba30f7eb46b9)

---

### 🐸 Cart API

![Screenshot from 2023-12-21 01-01-09](https://github.com/youssefshibl/eCommerce-nodejs/assets/63800183/750c855b-8e7b-417a-903b-f9097ca3c69b)

---

### 🐸 Order API

![Screenshot from 2023-12-21 01-00-41](https://github.com/youssefshibl/eCommerce-nodejs/assets/63800183/1f155621-c8a4-495d-9725-e2d33092673a)


---

## How to run the project

1. Clone the repo
2. run `./start.sh` this will start docker container for mongodb and the nodejs server
3. open `http://localhost:3000/ecommerce/v1/api-docs/` to see the swagger documentation 
4. to run seed data run `./runseeds.sh` this will create a user and some categories and products in mongodb

### important env variables
```
API_URL=/ecommerce/v1 
<!-- the base url for the api -->
IP=0.0.0.0
<!-- the ip for the server -->
PORT=3000
<!-- the port for the server -->
secret=secrte
<!-- the secret for jwt -->
User=6ad3f083f82509
<!-- the user for mailtrap -->
Pass=216d5fd895c179
<!-- the password for mailtrap -->
EMAIL=test@gmail.com
<!-- the email for mailtrap -->
```
---
## 🐸 Logging system

In this project i used morgan to log the requests as well as presistent logging in server.log file with details formated
```
172.20.0.1 - - [20/Dec/2023:23:14:22 +0000] "GET /ecommerce/v1/api-docs/favicon-32x32.png HTTP/1.1" 304 - "http://localhost:3000/ecommerce/v1/api-docs/" "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
172.20.0.1 - - [20/Dec/2023:23:14:41 +0000] "DELETE /ecommerce/v1/users/deleteuser/lkkk HTTP/1.1" 401 47 "http://localhost:3000/ecommerce/v1/api-docs/" "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
192.168.1.3 - - [20/Dec/2023:23:16:31 +0000] "GET / HTTP/1.1" 404 139 "-" "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36"
```





