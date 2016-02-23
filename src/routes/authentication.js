import express from 'express';
import passport from 'passport';
import hasAccess from '../userAccess';
import Account from '../models/account';

const authenticateLogin = passport.authenticate('local', {
  failureRedirect: '/failedLogin'
});

const router = express.Router();

router.post('/register', [ hasAccess('public'), (request, response, next) => {
  register(request, response, 'user');
}]);

router.post('/registerAdmin', [ hasAccess('public'), (request, response, next) => {
  register(request, response, 'admin');
}]);

router.post('/login', [ hasAccess('public'), authenticateLogin, (request, response, next) => {
  request.session.save((err) => {
    if (err) {
      return next(err);
    }
    response.redirect('/');
  });
}]);

router.get('/failedLogin', [ hasAccess('public'), (request, response, next) => {
  response.send({ error: 'invalid credentials.' });
}]);

router.get('/logout', [ hasAccess('registered'), (request, response, next) => {
  request.logout();
  request.session.save((err) => {
    if (err) {
      return next(err);
    }
    response.redirect('/');
  });
}]);

function register(request, response ,role) {
  const newAccount = new Account({ username: request.body.username, role });
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
}

export default router;
