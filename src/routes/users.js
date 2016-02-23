import express from 'express';
import passport from 'passport';
import Account from '../models/account';

const router = express.Router();

router.get('/', (request, response) => {
  Account.find({}, (error, users) => {
    response.send(users.map(user => { return user.username; }));
  });
});

export default router;
