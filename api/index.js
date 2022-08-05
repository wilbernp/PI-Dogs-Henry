const app = require('./src/app')
require('dotenv').config()
const {sequelize} = require('./src/db')

let port = process.env.PORT
app.listen(port, async ()=>{
    await sequelize.sync({force: true})
    console.log("listening at port " +port)
}) //listening port