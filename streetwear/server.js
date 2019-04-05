const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db
const uri = "mongodb://demo:demo@streetwear-shard-00-00-qdq7x.mongodb.net:27017,streetwear-shard-00-01-qdq7x.mongodb.net:27017,streetwear-shard-00-02-qdq7x.mongodb.net:27017/streetwear?ssl=true&replicaSet=streetwear-shard-0&authSource=admin&retryWrites=true"

MongoClient.connect(uri, (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(process.env.PORT || 3000, () => {
    console.log('listening on 3000')
  })
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  var streetwear = db.collection('streetwear').find();
  streetwear.toArray((err,result) =>{
    if (err) return console.log(err)
    res.render('index.ejs', {streetwear: result})
  });
})

app.put('/streetwear', (req, res) => {
  db.collection('streetwear')
  .findOneAndUpdate({img: req.body.img}, {
    $push: {
      ratings: req.body.rating
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})
