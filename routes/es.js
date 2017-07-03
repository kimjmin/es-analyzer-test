var express = require('express');
var router = express.Router();

//app.use(bodyParser.json());

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200'
  ,log: 'trace'
});

/* GET home page. */
router.post('/', function(req, res) {
  res.type('json');
  var anz = req.body.analyzers;
  client.indices.analyze({
    index: "koren-analyzers",
    analyzer:anz,
    text: req.body.a_text
  },function (error, response) {
    if (error) {
      console.error('elasticsearch cluster is down!');
    } else {
      var res_data = {analyzer:anz, data:response};
      res.send(res_data);
    }
  });

});

module.exports = router;