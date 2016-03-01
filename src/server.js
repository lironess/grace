import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import expressSession from 'express-session';
import passport from 'passport';
import cors from 'cors';
import { Strategy as LocalStrategy } from 'passport-local';
import mongoose from 'mongoose';
import Routes from './routes/index';
import Account from './models/account';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(expressSession({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

Routes(app);

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

mongoose.connect('mongodb://localhost/grace');

app.listen(3001, () => {
  console.log('Example app listening on port 3001!');
});
