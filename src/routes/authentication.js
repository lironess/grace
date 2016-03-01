import express from 'express';
import hasAccess from '../middleware/userAccess';
import Login from '../middleware/Login';
import Account from '../models/account';

const router = express.Router();

router.post('/register', [ hasAccess('public'), (request, response) => {
  register(request, response, 'user');
}]);

router.post('/registerAdmin', [ hasAccess('public'), (request, response) => {
  register(request, response, 'admin');
}]);

router.post('/login', [ hasAccess('public'), Login]);

router.get('/logout', [ hasAccess('registered'), (request, response) => {
  request.logout();
  request.session.save((error) => {
    if (error) {
      return response.status(500).send({ success: false, error });
    }
    return response.json({ success: true });
  });
}]);

function register(request, response, role) {
  const newAccount = new Account({ username: request.body.username, role });
  Account.register(newAccount, request.body.password, (error) => {
    if (error) {
      return response.status(400).send(error);
    }

    Login(request, response, () => {});
  });
}

export default router;
