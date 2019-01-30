const spicedPg = require('spiced-pg');
var db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    // var secrets = require('./secrets.json');
    const {dbUser, dbPass} = require('./secrets');
    db = spicedPg(`postgres:${dbUser}:${dbPass}@localhost:5432/social`);
}
/////////////////////////////////////////
//adduser=register user
module.exports.registerUser = function(first, last, email, password) {
    return db.query(`INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4) returning *`,
        [first, last, email, password]
    );
};
