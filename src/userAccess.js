export default function hasAccess(accessLevel) {
  return (request, response, next) => {
    if (accessLevel === 'public') {
      return next();
    }
    if (request.user && request.user.hasAccess(accessLevel)) {
      return next();
    }
    return response.json({
      error: `Unauthorized. Only ${accessLevel} users can request this.`
    });
  }
}