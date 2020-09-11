const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const cors = require('cors')

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));


// const newLocal = "Access-Control-Allow-Headers";
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5000"); // update to match the domain you will make the request from
//   res.header(newLocal, "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
//console.log(proxy)
// app.use('/proxy', createProxyMiddleware(
//   {
//     target:"http://localhost:5000",
//     secure: false
//     //changeOrigin: true
//   })
// )

// app.use(cors({
//   methods:['POST'],
//   origin:"http://localhost:5000"
// }))

app.use(cors());
//Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  //app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
