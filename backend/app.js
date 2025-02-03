const express = require("express");
const { expressjwt: jwt } = require("express-jwt");
const cors = require("cors"); 
const sequelize = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");

const app = express();
const port = 3001;

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

sequelize.sync().then(() => {
  console.log("Database & tables synchronized!");
});

app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true, 
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization"
}));

app.options("*", cors());

const jwtSecret = "your_jwt_secret";

app.use(
  jwt({ secret: jwtSecret, algorithms: ["HS256"] }).unless({
    path: ["/api/users/create", "/api/users/login"]
  })
);

app.use((req, res, next) => {
  console.log('Request path:', req.path);
  next();
});


app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);


app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return res.status(401).send("Unauthorized: No valid token provided.");
  }
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});

module.exports = app;
