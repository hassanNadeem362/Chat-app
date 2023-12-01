const mongoose = require('mongoose');
const Connection = async () => {
    try {
        await mongoose.connect(process.env.db);
        console.log("Connection Successful!");
     } catch (err) {
        console.log(err)
    }
}

module.exports = Connection;