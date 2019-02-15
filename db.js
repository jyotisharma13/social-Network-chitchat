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


//////////////////////////////////////////////
module.exports.getInitialFriendship = (loggedInId, otherUserId)=>{
    return db.query(`select * from friendships
        where (recipient_id =$1 AND sender_id =$2) OR
(recipient_id =$2 AND sender_id =$1 )`,
    [loggedInId, otherUserId]
    );
};
/////////////////////////////////////
module.exports.addfriendship = (loggedInId, otherUserId)=>{
    return db.query(`INSERT INTO friendships (sender_id, recipient_id)
     VALUES ($1, $2) returning *`,
    [loggedInId, otherUserId]
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
///////////////////////////////
module.exports.acceptfriendship = (loggedInId, otherUserId)=>{
    return db.query(
        `UPDATE friendships
        SET  accepted = true
        WHERE (recipient_id = $1 AND sender_id = $2)
        OR (recipient_id = $2 AND sender_id = $1)
        `, [loggedInId, otherUserId]
    );
};
////////////////////////////////////////
module.exports.getFriendshipLists = (id)=>{
    return db.query(
        `SELECT users.id, first, last, img_url, accepted
        FROM friendships
        JOIN users
        ON (accepted = false AND recipient_id = $1 AND sender_id = users.id)
        OR (accepted = true AND recipient_id = $1 AND sender_id = users.id)
        OR (accepted = true AND sender_id = $1 AND recipient_id = users.id)
        LEFT JOIN profile_images
        ON users.id = profile_images.user_id
    `,  [id]
    );
};
///////////////////////////////////////////
module.exports.updateBio = function(bio, id) {
    return db.query(`
        UPDATE users
        SET bio = $1
        WHERE id = $2
        RETURNING bio`,
    [ bio, id]
    );
};
//////////////////////////////////////////////
module.exports.getUsersByIds= function(arrayOfIds) {
    return db.query(
        `SELECT users.id AS id, first, last, img_url
         FROM users
       LEFT JOIN profile_images
       ON users.id = profile_images.user_id
       WHERE users.id = ANY($1)`,
        [arrayOfIds]
    );
};
//////////////////////////////////////////////
module.exports.getChatMessages = function() {
    return db.query(
        `SELECT users.id AS sender_id, users.first AS sender_first, users.last AS sender_last, profile_images.img_url AS sender_url, message, chatmessages.id AS message_id, chatmessages.created_at AS message_created_at
        FROM chatmessages
        LEFT JOIN users
        ON chatmessages.user_id = users.id
        LEFT JOIN profile_images
        ON chatmessages.user_id = profile_images.user_id
        ORDER BY chatmessages.created_at DESC
        LIMIT 10`
    );
};
////////////////////////////////////////////
module.exports.addChatMessage = function(message, user_id) {
    return db.query(
        `INSERT INTO chatmessages (message, user_id)
        VALUES ($1, $2)
        RETURNING *`,
        [message, user_id]
    );
};
////////////////////////////////////////////////////////////
module.exports.getFriendMessages = function(friendship_id) {
    return db.query(
        `SELECT users.id AS sender_id, users.first AS sender_first, users.last AS sender_last, profile_images.img_url AS sender_url, message, friendmessages.id AS message_id, friendmessages.created_at AS message_created_at
        FROM friendmessages
        LEFT JOIN users
        ON friendmessages.user_id = users.id
        LEFT JOIN profile_images
        ON friendmessages.user_id = profile_images.user_id
        WHERE friendmessages.friendship_id = $1
        ORDER BY friendmessages.created_at DESC
        LIMIT 10`,
        [friendship_id]
    );
};
////////////////////////////////////////////////////
module.exports.addFriendMessage = function(message, user_id, friendship_id) {
    return db.query(
        `INSERT INTO friendmessages (message, user_id, friendship_id)
        VALUES ($1, $2, $3)
        RETURNING *`,
        [message, user_id, friendship_id]
    );
};
