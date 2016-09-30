var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var uniqueValidator = require('mongoose-unique-validator');

var userSchema = new mongoose.Schema({
	email: 	{
				type: String,
				trim: true,
				lowercase: true,
				unique: true,
				uniqueCaseInsensitive: true,
				required: [true, 'Email address is required.'],
				validate: {
					validator: function(email) {
						return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
					},
					message: '{VALUE} is not a valid email address!'
				}
			},
	// literal username storage. with client's caps (e.g. foBbyToMmy)
	username: 	{
					type: String
				},
	// for verification purpose. without client's caps (e.g. fobbytommy)
	username_lowercase:	{
					type: String,
					required: [true, "Username is required."],
					trim: true,
					lowercase: true,
					unique: true,
					uniqueCaseInsensitive: true,
					minlength: [3, "Username, '{VALUE}', is too short! Minimum length is 3 characters!"],
					maxlength: [19, "Username, '{VALUE}', is too long! Maximum length is 19 characters!"],
					validate: {
						validator: function(username) {
							return /^[a-zA-Z0-9_]+$/.test(username); // ^\w+$ is broarder.
						},
						message: "'{VALUE}' is not a valid username. Only pure alphabets, numbers, and underscores (_) can be used."
					}
				},
	password: 	{
					type: String,
					required: [true, "Password is required."],
					minlength: [8, "Your password is too short! Minimum length is 8!"],
					maxlength: [32, "Your password is too long! Minimum length is 32"],
					validate: {
						validator: function(password) {
							// least 1 number, uppercase, and special character
							// return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test( password );

							// least 1 uppercase
							return /^(?=.*[A-Z])[A-Za-z\d$@$!%*?&]{8,32}/.test( password );
						},
						// message: "Password failed validation, you must have at least 1 number, uppercase, and special character."
						message: "Password failed validation, you must have at least 1 uppercase."
					}
				},
	authority_level: 	{
							type: Number,
							default: 1 // 1 for normal users
						}

}, { timestamps: true });

// applying the uniqueValidator plugin for userSchema
mongoose.plugin(uniqueValidator, { message: "'{VALUE}' is already taken. Use another {PATH}!" });

// custom method: hasing a password
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

// prior to saving: make password into hashed by calling the method above
userSchema.pre('save', function(done) {
	this.password = this.generateHash(this.password);
	done();
});

mongoose.model('User', userSchema);
