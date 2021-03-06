# User Authentication using Passport and Bcrypt
A robust, secure web application made with passport and bcrypt modules which use on-cloud Atlas MongoDB to store and retrieve user data.
View the live version at https://user-auth-passport.herokuapp.com/


### List of all modules and frameworks in use : 

- Nodejs 
- Express framework
    - Express body parser
    - Express sessions
    - Express ejs layouts
- EJS ( view engine )
- Mongoose ( for mongoDB connection and interaction )
- Passport ( For secure authentication and deauthentication checks )
- Bcryptjs ( For salt generation and hashing )
- Flash ( For persistent global message module )


### Clone this repository with

```bash
git clone https://github.com/inFamousxD/user-auth-passport
```

### Run

```bash
#for production
npm run start 

#for development
npm run dev 
```

### List of all views : 

- Driver html (layout.ejs)
- Welcome page ('/') ( welcome.ejs )
    : A card with login and register buttons
- Login page ('/users/login')
    : A card with login page
        - email entry
        - password entry
        - login button
- Register page ('/users/register')
    : A card with registration page
        - name entry
        - email entry 
        - password entry 
        - confirm password entry 
        - register button
- Dashboard page ('/dashboard')
    : To display current name with email address used to log in.
        - logout button

### Working : 

- Pre-processing
    : Starts body parser
    : Checks connection with database
        - DB in use is an online MongoDB by Atlas. Use the link in keys.js to change db to another account or localhost
    : Starts a local strategy for passport authentication
    : Set up view engine
    : Start listening on port 5000 or if mentioned in .env

- Home route leads to the welcome page. 
    : Redirects to login or registeration forms

- Registration page
    : Checks for valid email format
    : Checks password length ( 5 chars min )
    : Checks if password matches
    : Checks if email exists in database.
    : If all tests pass, Bcrypt hashes the password
    : The userdata alongside password is pushed to database
    : Redirects to login page with success message
        - Else re-renders page with errors

- Login page
    : Checks for valid email format
    : Checks for password length
    : Checks is email exists in database
    : Checks for password by bcrypt.compare()
    : Redirects to Dashboard

- Dashboard
    : Checks login status by isAuthenticated()? method
        - If not, redirects back to login page with error message
    : Displays username with welcome message and email address used to log in
    : Logout redirects to login page after session is terminated