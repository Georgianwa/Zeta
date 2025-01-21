# Zeta API

## Project Setup

1. Clone the repository:
git https://github.com/Georgianwa/personal-finance-manager
cd personal-finance-manager

2. Install dependencies:
npm install

3. Set up environment by creating a .env file:
- PORT = 3000
- JWT_SECRET = your_jwt_secret
- MONGODB_URI = your mongo_db uri
- EMAIL_HOST = smtp.mailtrap.io
- EMAIL_PORT = 2525
- EMAIL_USER = smtp_username
- EMAIL_PASSWORD = smtp_password

4. Run the application:
npm start

## Project structure
The user, budget and transaction schemas are defined in `userModel.js`, `budgetModel.js`, and `transactionModel.js` respectively. The controller logic is stored in the `controllers` folder (`userControllers.js`, `budgetControllers.js`, `transactionControllers.js`), where the user schema is used to define functions for registering new users, logging in, and viewing, updating or deleting profiles while, the budget and transaction schemas are used to define functions for viewing created budgets and transactions, creating new ones and updating or deleting existing budgets, or transactions when user identity has been verified. The routes folders contain the route definitions for users, budgets, and transactions seperately. The main app file is `index.js` and the server file containing the port setup is `server.js` The email template which is used to send emails to users upon successful registration is located in the views folder `./views/welcomeEmail.ejs`

## Postman Documentation

## Database Setup

### 1. MongoDB setup
1. Go to MongoDB Atlas and sign up
2. Create a new cluster
3. Select the "Connect" option and "Connect your application" then, select the "Drivers" option.
4. A connection string will be generated, this is your URI
5. Add the connection string through your .env file for security.

### 2. Install Mongoose
Install mongoose in your project directory with `npm install mongoose`

### 3. Set up the connection
create a `dbConfig.js` file to establish the database connection. This is already included in this repo.

### 4. .env file
Create a `.env` file for storing sensitive info like your uri and import needed variables with the `process.env...` command

### 5. Integrate `connectDB` in `index.js`
Import `connectDB` into your main app file to establish a connection when the server is run.

### 6. IP address
Ensure your current IP address is on your Atlas Cluster's IP whitelist: https://mongo
