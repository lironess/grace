import base from './authentication';
import users from './users';

export default function InitializeRoutes(app) {
  base.get('/', (request, response) => {
    response.send({ user: request.user });
  });

  base.get('/status', (request, response)=> {
      response.status(200).send(`I'm alive :)`);
  });

  app.use('/', base);
  app.use('/users', users);
};