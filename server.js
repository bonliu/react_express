// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const db = require("./database.js")
const md5 = require("md5");

const app = express();
const port = process.env.PORT || 5000;

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// Pre-processing to parse the body of POST requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handlebars
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Root endpoint
app.get('/', (req, res) => {
	res.render('home')
});

// Other API endpoints
app.get('/api/hello', (req, res) => {
	res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
	console.log(req.body);
	res.send(
		`I received your POST request. This is what you sent me: ${req.body.jimmy}`,
	);
});

app.post('/api/login', (req, res) => {
	console.log(req.body);
	var sql = "SELECT * FROM user WHERE email = ? AND password = ?"
	var params = [req.body.email, md5(req.body.password)]
	db.all(sql, params, (err, rows) => {
		if (err) {
			// 400 Bad Request
			res.status(400).json({ "error": err.message });
			return;
		}
		if (rows.length > 0) {
			res.json({
				"message": "success",
				"data": rows
			})
		} else {
			res.json({
				"message": "fail"
			})
		}

		// res.send('success');
	});

	// if (res.message === 'success') {
	// 	// console.log(res.data.email + "signed in.")
	// 	res.send('success');
	// }



});

app.post('/api/signup', (req, res) => {
	var errors = []
	var fullname = req.body.fullname.split(' ')
	var data = {
		first_name: fullname[0],
		last_name: fullname[1],
		email: req.body.email,
		password: md5(req.body.password)
	}

	var insert = 'INSERT INTO user (first_name, last_name, email, password, balance_in_cent) VALUES (?,?,?,?,?)'
	var params = [data.first_name, data.last_name, data.email, data.password, 500000]
	db.run(insert, params, (err, result) => {
		if (err) {
			// res.status(400).json({ "error": err.message })
			res.send('Account existed.');
			return;
		} else {
			res.send('Account created.');
		}
		// res.json({
		// 	"message": "success",
		// 	"data": data,
		// 	"id": this.lastID
		// })

		// console.log(`Account ${data.email} is created successfully`)
		console.log(req.body);
		// res.redirect('/api/users');
	});
	// console.log(req.body);
	// res.send(
	// 	`I received your POST request. This is what you sent me: ${req.body.email}`,
	// );

});

app.get("/api/users", (req, res) => {
	// Get all users from database
	var sql = "SELECT * FROM user"
	var params = []
	db.all(sql, params, (err, rows) => {
		if (err) {
			// 400 Bad Request
			res.status(400).json({ "error": err.message });
			return;
		}
		res.json({
			"message": "success",
			"data": rows
		})
	});
});

app.post("/api/email", (req, res) => {
	var select = 'SELECT * FROM user WHERE email = ?'
	var params = [req.body.email]
	db.get(select, params, (err, result) => {
		if (err) {
			res.status(400).json({ "error": err.message })
			return;
		}
		res.json({
			"message": "success",
			"data": result
		})
	});
});

app.post("/api/reset", (req, res) => {
	var reset = 'DELETE FROM user WHERE id <> 1'
	db.run(reset, [], (err, result) => {
		if (err) {
			res.status(400).json({ "error": res.message })
			return;
		}
		res.json({ "message": "deleted", changes: this.changes })
	});
});

app.listen(port, () => console.log(`Listening on port ${port}`));
