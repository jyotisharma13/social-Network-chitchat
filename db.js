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

module.exports.registerUser = function(first, last, email, hashedpass) {
    return db.query(`INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4) returning *`,
        [first, last, email, hashedpass]
    );
};
///////////////////////////////////////////

module.exports.getLoginInfo = function(email) {
    return db.query(`SELECT * FROM users where email = $1`,
        [email]
    );
};
////////////////////////////////////////////////
module.exports.getUserInfo = function(user_id){
    return db.query(`SELECT users.first AS first, users.last AS last, users.id AS id, users.bio AS bio, profile_images.img_url AS url, users.email AS email
        FROM users
        LEFT JOIN profile_images
        ON users.id = profile_images.user_id
        WHERE users.id = $1`,
    [user_id]
    );
};
///////////////////////////////////
module.exports.addImage = function(img_url, user_id) {
    return db.query(
        `INSERT INTO profile_images (img_url, user_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id)
        DO UPDATE SET img_url = $1
        RETURNING img_url`,
        [img_url, user_id]
    );
};
/////////////////////////////////7

//////////////////////////////////////////////
module.eports.getInitialFriendship = function(loggedInId, loggedOutId){
    return db.query(`select * from friendships
        where (recipient_id =$1 AND sender_id =$2) OR
(recipient_id =$2 AND sender_id =$1 )`,
    [loggedInId, loggedOutId]
    );
};
/////////////////////////////////////
module.export.addfrinedship = function(sender_id,recipient_id){
    return db.query(`INSERT INTO friendships(sender_id,recipient_id)
     VALUES ($1, $2) returning *`,
    [sender_id,recipient_id]
    );
};
///////////////////////////////
module.exports.deletefriendship = (loggedInId, otherUserId)=>{
    return db.query(
        `DELETE FROM friendships
        WHERE (recipient_id = $1 AND sender_id = $2)
        OR (recipient_id = $2 AND sender_id = $1)`, [loggedInId, otherUserId]
    );
};
////////////////////////////////////////
module.exports.updateBio = function(bio, id) {
    return db.query(`
        UPDATE users
        SET bio = $1
        WHERE id = $2
        RETURNING bio`,
    [ bio, id]
    );
};
