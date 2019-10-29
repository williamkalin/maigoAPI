const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Item = require('./models/item');
const express = require('express');
const Grid = require('gridfs-stream');
const menRouter = require('./routes/men')
const womenRouter = require('./routes/women')
require('dotenv').config();


// I'll mabye need methodOverride

// https://www.npmjs.com/package/express-rate-limit use this for rate limiting
const options = {
   useUnifiedTopology: true,
   useFindAndModify: false,
   useCreateIndex: true,
   useNewUrlParser: true
}


const app = express();
app.use(express.static(__dirname + "/"));
app.use(bodyParser.json());


const mongoURI = process.env.MONGODB_KEY;

const conn = mongoose.createConnection(mongoURI, options);
mongoose.connect(mongoURI, options);


let gfs;

conn.once('open', () => {
   // Init stream
   gfs = Grid(conn.db, mongoose.mongo);
   gfs.collection('image');
});

app.use("/men", menRouter);
app.use("/women", womenRouter);




//Route for handling retrieving images from DB
app.get('/images/:slug', (req, res) => {

   gfs.files.findOne({ filename: req.params.slug }, (err, file) => {

      if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
         const readstream = gfs.createReadStream(file.filename);
         readstream.pipe(res);
      }

   })
})



//Route for getting one item
app.get("/clothing/:slug", (req, res) => {

   Item.find({ imagename: req.params.slug }, (err, response) => {

      res.send(response);

   })

})

//Route for getting all unique types of clothes
app.get("/uniquetypes", (req, res) => {

   var alltypes = {};

   Item.find({ gender: "men" }).distinct('type', (error, types) => {

      alltypes.men = types;

      Item.find({ gender: "women" }).distinct('type', (error, types) => {
         alltypes.women = types;
         res.send(alltypes);
      })

   })

})







app.get('*', function (req, res) {
   res.status(404).send();
});



const port = 5000;

app.listen(process.env.PORT || 3000);