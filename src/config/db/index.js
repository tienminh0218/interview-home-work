const mongoose = require("mongoose");

async function connect() {
    try {
        await mongoose.connect(process.env.URL_MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log("Connect To Database Success");
    } catch (error) {
        console.log("Error connect:" + error);
    }
}

module.exports = { connect };
