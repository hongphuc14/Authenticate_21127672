const express = require("express");
const app = express();
const port = 4000;
const expressHbs = require("express-handlebars");

const cookieParser = require("cookie-parser");
const session = require("express-session");

// Thiet lap thu muc Static
app.use(express.static(__dirname + "/html"));

// Cau hinh Template Engine
app.engine(
  "hbs",
  expressHbs.engine({
    layoutsDir: __dirname + "/views/layouts",
    defaultLayout: "layout",
    extname: "hbs",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
    },
  })
);
app.set("view engine", "hbs");

// Cau hinh cho phep doc du lieu gui len bang phuong thuc POST
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Thiet lap sd cookie
app.use(cookieParser("21127672"));

// Thiet lap sd session va luu tru session tren Redis
app.use(
  session({
    secret: "21127672",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true, //prevent client using JS reading cookie
      maxAge: 20 * 60 * 1000 // 20ph
    }
  })
);

// Chuyen huong route xu ly
app.use("/", require("./routes/authRouter"));

// Start web server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
