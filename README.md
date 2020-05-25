# StockPro
A web application using [Express](https://expressjs.com/) and [React](https://reactjs.org/) for buying and trading stocks.

- [x] Story 1
    * [Sign up page](http://localhost:3000/signup)
    * Create new account with name, email, and password.
        * Default the user's cash account balance to $5000.00.
        * A user can only register once with any given email.

- [x] Story 2
    * [Login page](http://localhost:3000/login)
    * Log in using user's email and password

- [] Story 3
    * Users are allowed to buy shares of stock at its **current price** by specifying its **ticker symbol** and the **number of shares**
        - Only whole number quantities of shares is allowed.
        - A user can only buy shares if they have enough cash in their account for a given purchase.
        - A user can only buy shares if the ticker symbol is valid.

- [] Story 4
    - Show a list of all transactions a user has made to date (trades).

- [] Story 5
    - [Portfolio page]
    - A list of all the stocks a user own along with their current values
        * Current values should be based on the latest price and quantity owned for a given stock.
        * Each stock owned should only appear once

- [] Story 6
    - **Font color** of <em>stock symbols</em> and <em>current prices</em> in the porfolio change dynamically to indicate performance 
        * **Red** --> current price < the day's open price
        * **Grey** --> current price = the day's open price
        * **Green** --> current price > the day's open price