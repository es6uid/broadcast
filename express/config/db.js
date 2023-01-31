const mongoose = require('mongoose');

const connectDB = async () => {
      try{
        const conn = await mongoose.connect('mongodb+srv://es6uid:Srmcem%400292@cluster0.qbocvjp.mongodb.net/boradcastvideo?retryWrites=true&w=majority')
        console.log(`MongoDB connected ${conn.connection.host}`)
      }catch(error){
        console.log(error)
        process.exit(1)
      }
}

module.exports = connectDB