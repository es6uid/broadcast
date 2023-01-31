const express = require('express')
const path = require('path')
const app = express()
const connectDB = require('./config/db')
const port = process.env.PORT || 5000
const logger = require('./middleware/Logger')

const cors = require("cors");


connectDB()


app.options("*", cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }));

app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));

app.get('/', (req, res) => {
  res.send('Hello World!!!')
})
// Set static folder
// app.get('/video', (req, res) => {
//   // res.send('Video route')
//   res.sendFile(path.join(__dirname, 'public', 'video.html'))
// })

// Init or Initialize middleware
app.use(logger)

// Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))

// Members api route
app.use('/api/members', require('./routes/api/members'))

// Media api 
app.use('/api/media', require('./routes/api/media'))

app.use(express.static(path.join(__dirname, 'public')));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
