
const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payments");
const contactUsRoute = require("./routes/Contact");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");


const PORT = process.env.PORT || 4000;

function requestLogger(req, res, next) {
    console.log("\x1b[36m", "===============================================");
    console.log("\x1b[33m", `Method: ${req.method}, Route: ${req.originalUrl}`);
    console.log("\x1b[33m", `Request Body: ${JSON.stringify(req.body)}`);
    console.log("\x1b[33m", `Query Parameters: ${JSON.stringify(req.query)}`);
    console.log("\x1b[33m", `Request Headers: ${JSON.stringify(req.headers)}`);
    console.log("\x1b[36m", "===============================================");
    next();
}


dotenv.config();


database.connect();

app.use(requestLogger);
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);


cloudinaryConnect();


app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);


app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});


app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});


