const express = require("express")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const helmet = require("helmet")
const cookieParser = require("cookie-parser")
const app = express()

//connect to database
require("./db")

//importing router
const authRouter = require("./routes/auth")
const userRouter = require("./routes/user")
const postRouter = require("./routes/post")
const cartRouter = require("./routes/cart")
require('dotenv').config();

app.use(helmet())
app.use(morgan('dev'))
app.use(express.static('public'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use("/auth", authRouter)
app.use("/user", userRouter)
app.use("/post", postRouter)
app.use("/cart",cartRouter)

app.listen(8000, () => {
    console.log("server running at 8000")
})