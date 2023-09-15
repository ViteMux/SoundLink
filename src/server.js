const express = require("express")
const ejs = require("ejs")
const helmet = require("helmet");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const mainRouter = require("./router/main.router");

var app = express();
app.set("views", "./src/view");
app.set("view engine", "html");
// Will render html files with ejs
app.engine(".html", ejs.renderFile)
app.use(express.static("./src/public", { etag: false }))
app.use(helmet.hsts())
app.use(helmet.hidePoweredBy())
app.use(helmet.xssFilter())
app.use(helmet.frameguard())

app.use("/", mainRouter);
app.use((req, res) => {
    res.status(404).render("error", {errorCode: "404", title: "页面不存在", desc: "你所访问的页面无法找到"});
});

app.listen(process.env.PORT, () => {
    console.log(`App start running at port ${process.env.PORT}`);
});
