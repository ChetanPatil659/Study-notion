const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URL = "mongodb+srv://patilchetan659:chetan659@cluster0.o2qe1zg.mongodb.net/studyNotion?retryWrites=true&w=majority";

exports.connect = () => {
	mongoose
		.connect(MONGODB_URL, {
			useNewUrlparser: true,
			useUnifiedTopology: true,
		})
		.then(console.log(`DB Connection Success`))
		.catch((err) => {
			console.log(`DB Connection Failed`);
			console.log(err);
			process.exit(1);
		});
};
