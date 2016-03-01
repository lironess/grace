import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import mongooseRole from 'mongoose-role';
import jwt from 'jsonwebtoken';

const Schema = mongoose.Schema;

const Account = new Schema({
  username: String,
  password: String,
  email: String
});

Account.plugin(passportLocalMongoose);
Account.plugin(mongooseRole, {
  roles: ['public', 'user', 'admin'],
  accessLevels: {
    'public': ['public', 'user', 'admin'],
    'registered': ['user', 'admin'],
    'admin': ['admin']
  }
});

const secretToken = 'grace-is-great!';
Account.methods.createToken = function() {
  return jwt.sign({ id: this._id }, secretToken);
};
Account.statics.getSecret = function() { return secretToken; };

const accountModel = mongoose.model('accounts', Account);

export default accountModel;
