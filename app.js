/* Import and configure dependencies */

const express = require('express'); // Import Express.js
const mysql = require('mysql2'); // Import MySQL2
const dotenv = require('dotenv'); // Import dotenv
const path = require('path'); // Import path
const bcrypt = require('bcryptjs'); // Import bcrypt
const session = require('express-session'); // Import express-session

dotenv.config({ path: './.env'}); // Configure dotenv with environmental variables

const app = express(); // Create an Express.js app

/* Set environment variables */

if (!process.env.DATABASE || !process.env.DATABASE_HOST || !process.env.DATABASE_USER ||
	!process.env.DATABASE_PASSWORD || !process.env.PORT || !process.env.SESSION_SECRET) { // Seeing if any of the environment variables are missing
	console.error('Missing required environment variables.');
	process.exit(1);
}

const db = mysql.createConnection({ // Access variables from process.env and pass to connection properties
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE
});

/* Connect to MySQL database */

db.connect((connectError) => { // Connect to MySQL database
	if (connectError) {
		console.log('Error connecting to MySQL database:', connectError);
		return;
	}
	else {
		console.log('Successfully connected to MySQL database.');
	}
});

/* Configure Express.js application */

const publicDir = path.join(__dirname, './public'); // Get path '"__dirname"/public'
app.use(express.static(publicDir)); // Specify the static assets used in Handlebar templates
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // Configure Express.js server to recieve form values as JSON
app.set('view engine', 'hbs'); // Specify the view engine as Handlebars (.hbs files)

/* Configure express-session middleware for user sessions */

app.use(session({ // Configure express-session properties
	secret: process.env.SESSION_SECRET,
	resave: true,
	saveUninitialized: true
}));

/* Register routes for HTTP get requests */

app.get('/', (request, response) => { // Register a route for rendering index.hbs on the homepage
	const message = request.session.message; // Retrieve message from the session
	request.session.message = null; // Clear message from session
	response.render('index', { message }); // Render index page w/ message
});

app.get('/register', (request, response) => { // Register a route for rendering register.hbs from nav link /register
	const message = request.session.message; // Retrieve message from the session
	request.session.message = null; // Clear message from session
	response.render('register', { message }); // Render register page w/ message
});

app.get('/login', (request, response) => { // Register a route for rendering login.hbs from nav link /login
	const message = request.session.message; // Retrieve message from the session
	request.session.message = null; // Clear message from session
	response.render('login', { message }); // Render login page w/ message
});

/* Register route for HTTP post requests for '/auth/register' (account registration) */

app.post('/auth/register', (request, response) => { // Create '/auth/register' route
	const { username, email, password, password_confirm } = request.body; // Retrieve user's form values
	
	if (username == "" || email == "" || password == "" || password_confirm == "") { // If any of the form entries are empty
		return response.render('register', { message: 'Please enter each field' }); // Render 'register' message using app.post response
	}
	else if (password !== password_confirm) { // If password and password_confirm do not match
		return response.render('register', { message: 'Passwords do not match' }); // Render 'register' message using app.post response
	}
	/*
	
	Other Registration Requirements...
	
	*/
	db.query('SELECT username FROM users WHERE username = ?', [username], async (userError, userResponse) => { // Query the database to get user's username based on given username
		if (userError) {
			console.log('Error querying the database:', userError);
			return;
		}
		
		if (userResponse.length > 0) { // If the query produces a result (username already exists)
			return response.render('register', { message: 'This username is already in use' }); // Render 'register' message using app.post response
		}
		
		const saltRounds = 10;
		const salt = bcrypt.genSaltSync(saltRounds); // Generate salt with salt rounds
		let hashedPassword = await bcrypt.hashSync(password, salt); // Hash password with salt (SALT IS STORED WITH HASHED PASSWORD)
		
		db.query('INSERT INTO users SET ?', { username: username, email: email, password: hashedPassword }, (dbError, dbResult) => {
			if (dbError) {
				console.log('Error querying the database:', dbError);
				return;
			}
			else {

				request.session.message = 'Account registered!'; // Store status message in session
				return response.redirect('/'); // Redirect to '/index' using app.post response
			}
		});
	});
});

/* Register route for HTTP post requests for '/auth/login' (account login) */

app.post('/auth/login', (request, response) => { // Create '/auth/login' route
	const { username, password } = request.body; // Retrieve user's form values
	
	if (username == "" && password == "") { // If none of the fields are provided
		return response.render('login', { message: 'Please enter each field' }); // Render 'login' message using app.post response
	}
	else if (username == "") { // If the username specifically is not provided
		return response.render('login', { message: 'Please enter your username' }); // Render 'login' message using app.post response
	}
	else if (password == "") { // If the password specifically is not provided
		return response.render('login', { message: 'Please enter your password' }); // Render 'login' message using app.post response
	}
	
	db.query('SELECT username, password FROM users WHERE username = ?', [username], async (userError, userResponse) => { // Query the database to get user's username and password based on given username
		if (userError) {
			console.log('Error querying the database:', userError);
			return;
		}
		
		if (userResponse.length === 0) { // If the query doesn't produce a result (username / user doesn't exist)
			return response.render('login', { message: 'Username not found' }); // Render 'login' message using app.post response
		}
		
		const user = userResponse[0]; // Get the user row from database table
		
		if (await bcrypt.compare(password, user.password)) { // Check if password is valid
			request.session.message = 'Successfully logged in!'; // Store status message in session
			return response.redirect('/'); // Redirect to '/' (index) using app.post response
		}
		else {
			return response.render('login', { message: 'Incorrect password' }); // Render 'login' message using app.post response
		}
	});
});

/* Listen to the port */

app.listen(process.env.PORT, () => { // Configure the port for the app
	console.log('Server started on port', process.env.PORT);
});
