import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import mongooseRole from 'mongoose-role';

const Schema = mongoose.Schema;

const Account = new Schema({
  username: String,
  password: String
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

const accountModel = mongoose.model('accounts', Account);

export default accountModel;
