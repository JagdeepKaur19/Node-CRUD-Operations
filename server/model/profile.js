var Schema = mongoose.Schema;

var profile = new Schema ({
    name: String,
    email: String,
    password: String

}, {collection: 'profileData'})
mongoose.model('profileModel', profile);

