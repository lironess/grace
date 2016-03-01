import passport from 'passport';

export default function Login(request, response, next) {
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      return response.status(500).send({ success: false, error });
    }
    if (user) {
      request.logIn(user, () => {
        if (error) {
          return response.status(500).send({ success: false, error });
        }
        return response.json({ success: true });
      });
    }
    else {
      return response.status(400).send({ success: false, error: info });
    }
  })(request, response, next);
}
