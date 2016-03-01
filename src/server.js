import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import cors from 'cors';
import { Strategy as LocalStrategy } from 'passport-local';
import mongoose from 'mongoose';
import Routes from './routes/index';
import Account from './models/account';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

Routes(app);

const strategyOptions = {
  secretOrKey: Account.getSecret(),
  jwtFromRequest: ExtractJwt.fromHeader('token')
};
passport.use(new JwtStrategy(strategyOptions, (jwtPayload, next) => {
  Account.findOne({ _id: jwtPayload.id }, next);
}));

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

mongoose.connect('mongodb://localhost/grace');

app.listen(3001, () => {
  console.log('Example app listening on port 3001!');
});
