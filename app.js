const express = require('express'); // Import Express.js
const mysql = require('mysql2'); // Import MySQL2
const dotenv = require('dotenv'); // Import dotenv
const path = require('path'); // Import path
const bcrypt = require('bcryptjs'); // Import bcrypt

dotenv.config({ path: './.env'}); // Configure dotenv with environmental variables

const app = express(); // Create an Express.js app

const db = mysql.createConnection({ // Access variables from process.env and pass to connection properties
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE
});

const publicDir = path.join(__dirname, './public');
app.use(express.static(publicDir)); // Specify the static assets used in Handlebar templates
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // Configure Express.js server to recieve form values as JSON

app.set('view engine', 'hbs'); // Specify the view engine as Handlebars (.hbs files)

db.connect((error) => { // Connect to MySQL database
	if (error) {
		console.log('Error connecting to MySQL database:', error);
	}
	else {
		console.log('Successfully connected to MySQL database.');
	}
});

app.get('/', (req, res) => { // Register a route for rendering index.hbs on the homepage
	res.render('index');
});

app.get('/register', (req, res) => { // Register a route for rendering register.hbs from nav link /register
	res.render('register');
});

app.get('/login', (req, res) => { // Register a route for rendering login.hbs from nav link /login
	res.render('login');
});

app.post('/auth/register', (req, res) => { // Create '/auth/register'
	const { name, email, password, password_confirm } = req.body; // Retrieve user's form values
	console.log(req.body); // TEST
	
	db.query('SELECT email FROM users WHERE email = ?', [email], async (error, result) => { // Query the database to check if email is on server (register only once per email)
		if (error) {
			console.log('Error querying the database:', error);
		}
		
		if (result.length > 0) { // If the query produces result (email already exists)
			return res.render('register', { message: 'This email is already in use...' });
		}
		else if (password !== password_confirm) { // If password and password_confirm do not match
			return res.render('register', { message: 'Passwords do not match!' });
		}
		
		let hashedPassword = await bcrypt.hash(password, 8); // Hash password
		
		db.query('INSERT INTO users SET ?', { name: name, email: email, password: hashedPassword }, (err, dbResult) => {
			if (err) {
				console.log('Error querying the database:', dbResult);
			}
			else {
				return res.render('register', { message: 'User registered!' });
			}
		});
	});
});

app.listen(5000, () => { // Configure the port for the app (which will be 5000)
	console.log('Server started on port 5000.');
});
