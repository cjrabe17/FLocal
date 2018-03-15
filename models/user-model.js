var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    googleId: String,
    thumbnail: String
});

var User = mongoose.model("user", userSchema);

module.exports = User;

// Sequelize this later

// module.exports = function(sequelize, DataTypes) {
//     var User = sequelize.define('user', {
//         username: DataTypes.STRING,
//         googleId: DataTypes.STRING
//     });
//     return User;
// }