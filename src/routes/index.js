import hasAccess from '../userAccess';
import base from './authentication';
import users from './users';

export default function InitializeRoutes(app) {
  base.get('/', [ hasAccess('public'), (request, response) => {
    response.send({ user: request.user });
  }]);

  base.get('/status', [ hasAccess('public'), (request, response)=> {
      response.status(200).send(`I'm alive :)`);
  }]);

  app.use('/', base);
  app.use('/users', users);
};