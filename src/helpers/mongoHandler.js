const mongoose = require("mongoose");
const settings = require("../../config.json");

mongoose.connect(settings.bot.mongoUrl, {
	useUnifiedTopology: true,
	useNewUrlParser: true
}).catch(() => { console.log("Mongo Connection Error!"); });

mongoose.connection.on("connected", () => {
	console.log("Connected to DB");
});
mongoose.connection.on("error", () => {
	console.error("Connection Error!");
});