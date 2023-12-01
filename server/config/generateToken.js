const jwt = require('jsonwebtoken');


const  generateToken = (id) => {
    return jwt.sign({_id: id} , process.env.SECRET_KEY, {expiresIn: "4hr"});
}


module.exports = generateToken;