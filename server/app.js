/*
============================================
; Title: BCRS
; Authors: Mike Goldberg, Emily Richter, Ashleigh Lyman
; Date: 10/20/2020
; Modified By: Mike Goldberg
; Description: E2E MEAN Stack Application
;===========================================
*/

/**
 * Require statements
 */
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const User = require('./models/user');
const UserApi = require('./routes/user-api');
const SecurityQuestion = require('./models/security-question');
const SecurityQuestionApi = require('./routes/security-question-api');
const SessionApi = require('./routes/session-api');
const RolesApi = require('./routes/role-api');
const InvoiceApi = require('./routes/invoice-api');

/**
 * App configurations
 */
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': true }));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist/bcrs')));
app.use('/', express.static(path.join(__dirname, '../dist/bcrs')));

/**
 * Variables
 */
const port = process.env.PORT || 3000; // server port

// database connection string
const conn = 'mongodb+srv://web450_user:Lymanfamily1@buwebdev-cluster-1.akyor.mongodb.net/bcrs?retryWrites=true&w=majority';

/**
 * Database connection
 */
mongoose.connect(conn, {
    promiseLibrary: require('bluebird'),
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndexes: true
}).then(() => {
    console.debug(`Connection to the database instance was successful`);
}).catch(err => {
    console.log(`MongoDB Error: ${err.message}`)
}); // end mongoose connection

/**
 * API(s) go here...
 */
app.use('/api/users', UserApi); //localhost:3000/api/user
app.use('/api/security-questions', SecurityQuestionApi); //localhost:3000/api/security-question
app.use('/api/session', SessionApi); //localhost:3000/api/session
app.use('/api/roles', RolesApi) //localhost:3000/api/roles
app.use('/api/invoice', InvoiceApi) //localhost:3000/api/invoice

/**
 * Create and start server
 */
http.createServer(app).listen(port, function() {
    console.log(`Application started and listening on port: ${port}`)
}); // end http create server function
