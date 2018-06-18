const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'password',
    database : 'smartbrain'
  }
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

//Getting a response
app.get('/', (req, res) =>{
	res.send(database.users); 
})

//Signing In with Post - Linking to Post.js and passing requirements
app.post('/signin', (req, res) => {signin.handleSignIn(req, res, db, bcrypt)})

//Registering with Post
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

//Getting a Profile
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

//Updating Entries
app.put('/image', (req, res) => {image.handleImage(req, res, db)})

//Setting Up Port
app.listen(process.env.PORT || 3000, () => {
	console.log(`App is up and running on ${process.env.PORT`});
})

/*
Routing

/ --> res = this is working
/signing --> POST --> success/fail
/register --> POST --> user
/profile/:userId --> GET --> user
/image --> PUT --> imageCount


*/