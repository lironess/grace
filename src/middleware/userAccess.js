import passport from 'passport';

export default function hasAccess(accessLevel) {
  return (request, response, next) => {
    if (accessLevel === 'public') {
      return next();
    }
    passport.authenticate('jwt', { session: false }, (error, user, info) => {
      if (error) {
        return response.status(500).send({ success: false, error });
      }
      if (user) {
        if (user.hasAccess(accessLevel)) {
          return next();
        }
        return response.json({
          error: `Unauthorized. Only ${accessLevel} users can request this.`
        });
      }
      else {
        return response.status(400).send({ success: false, error: info });
      }
    })(request, response, next);
  };
}
