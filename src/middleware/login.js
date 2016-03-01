import passport from 'passport';

export default function Login(request, response, next) {
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      return response.status(500).send({ success: false, error });
    }
    if (user) {
      const token = user.createToken();
      return response.json(
        {
          success: true,
          token,
          user: {
            id: user._id,
            username: user.username,
            role: user.role,
            email: user.email
          }});
    }
    else {
      return response.status(400).send({ success: false, error: info });
    }
  })(request, response, next);
}
