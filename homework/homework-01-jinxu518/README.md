# MIU-CS571-2023-10-Homework01
## Create an Express web server from scratch
1. Make a new directory
2. Open the terminal on VS Code and cd to that directory
3. Initialize a new NodeJS project by the command: npm init -y
4. Install ExpressJS: npm i express --save
5. Install nodemon: npm i nodemon --save
6. Add the line to 'scripts' of the file package.json
"start": "nodemon app.js"
7. Create the file app.js
8. Run the app: npm start
## Implement the following Restful APIs. You can keep the data in an array.
1. POST /products: To add a new product. The body of this request should contain the product's information. You should attach the header "authorization" with the scheme "Bearer <token>" (this token is returned when you log in successfully). If successful, the body return {success: true, data: <new Product>}. Otherwise, it return {success: false, error: <message>}
2. PUT /products/{id}: To add a new Product. The body of this request should contain the product's information. You should attach the header "authorization" with the scheme "Bearer <token>" (this token is returned when you log in successfully). If successful, the body return {success: true}. Otherwise, it return {success: false, error: <message>}
3. DELETE /products/{id}: To add a new product. You should attach the header "authorization" with the scheme "Bearer <token>" (this token is returned when you log in successfully). If successful, the body return {success: true}. Otherwise, it return {success: false, error: <message>}
4. GET /products: To get all products. You should attach the header "authorization" with the scheme "Bearer <token>" (this token is returned when you log in successfully). If successful, the body return {success: true, data: <list of products>}. Otherwise, it return {success: false, error: <message>}
**Note: Please submit the homework by `10:00 PM CST`**
