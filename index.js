const express = require('express')
const app = express()
var session = require('express-session')

const db = require("./config/db.js")
const users = require('./routes/user.routes.js')

const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({extended:true})); //Parse URL-encoded bodies
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))


const main = async ()=>{
  try{
    await db.sequelize.authenticate();
    console.log("Connection has been established successfully.");
    /**
     * Start the web server on the specified port.
     */
    await db.sequelize.sync({force:false})
    app.use('/users', users)

    app.listen(PORT, () => {
       console.log(`Server is running at: http://localhost:${PORT}`);
    });

  }catch (err){
    console.error("Err in express app", err)
  }
}
main()
