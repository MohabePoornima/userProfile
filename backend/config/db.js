const mongoose = require("mongoose");
require('dotenv').config()

const connectiondb = mongoose.connect(process.env.monngo_url)

module.exports = {
    connectiondb
}