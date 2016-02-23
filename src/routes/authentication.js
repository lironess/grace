import express from 'express';
import passport from 'passport';
import Account from '../models/account';

const authenticateLogin = passport.authenticate('local', {
  failureRedirect: '/login'
});

const router = express.Router();

router.post('/register', (request, response, next) => {
  const newAccount = new Account({ username: request.body.username });
  Account.register(newAccount, request.body.password, (error) => {
    if (error) {
      return response.status(400).send(error);
    }

    passport.authenticate('local')(request, response, () => {
      request.session.save((error) => {
        if (error) {
          return next(error);
        }
        response.redirect('/');
      });
    });
  });
});

router.post('/login', authenticateLogin, (request, response, next) => {
  request.session.save((err) => {
    if (err) {
      return next(err);
    }
    response.redirect('/');
  });
});

router.get('/logout', (request, response, next) => {
  request.logout();
  request.session.save((err) => {
    if (err) {
      return next(err);
    }
    response.redirect('/');
  });
});

export default router;
