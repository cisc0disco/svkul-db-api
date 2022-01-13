var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var Model = require('../models/pomucka');

router.use(bodyParser.urlencoded({ extended: false })); 
router.use(bodyParser.json());

/*
router.get('/', function(req, res, next) 
{
	var add = new Model({autor: "Semotanová, Eva", nazev: "Česko : Ottův historický atlas", rok: 2007, nakladatel: "Ottovo", mistoVydani: "Praha", signatura: "IN191196", "ISXN": 9788073605775, id: "K.II.2.14, K.II.2.15"});

	test.save(function(err, doc) {
		if (err) return res.sendStatus(406);
		res.send("úspěšně přidáno!");
	});
});
*/

router.post('/add', function(req, res, next) 
{
	console.log(req.body);

	if(req.body.constructor === Object && Object.keys(req.body).length === 0) 
	{
		console.log('Object missing');
		res.sendStatus(418);
	} else 
	{
		var ids = [];

		req.body.id.split(", ").forEach(element =>
		{
			if (element.substr(element.length - 1) == ".") 
			{
				element = element.slice(0, -1);
			}

			ids.push(element.replace("UNIV: ", "U"));
		});

		var add = Model({autor: req.body.autor, nazev: req.body.nazev, rok: req.body.rok, nakladatel: req.body.nakladatel, mistoVydani: req.body.mistoVydani, signatura: req.body.signatura, ISXN: req.body.isxn, id: ids});

		add.save(function(err, doc) {
			if (err) return res.send(406);
			res.sendStatus(200);
		});
	}
});

router.post('/fetch', function(req, res, next) 
{
	if(req.body.constructor === Object && Object.keys(req.body).length === 0) 
	{
		console.log('Object missing');
		res.sendStatus(418);
	} else if (req.body.kategorie.indexOf("A") > -1 || req.body.kategorie.indexOf("B") > -1 || req.body.kategorie.indexOf("C") > -1 ||req.body.kategorie.indexOf("D") > -1 || req.body.kategorie.indexOf("E") > -1 || req.body.kategorie.indexOf("G") > -1 || req.body.kategorie.indexOf("H") > -1 || req.body.kategorie.indexOf("I") > -1 || req.body.kategorie.indexOf("J") > -1 || req.body.kategorie.indexOf("K") > -1) 
	{
		console.log(req.body.kategorie);

		Model.find({id: {$regex: "^" + req.body.kategorie}}, function(err, docs) {
			if (err) return res.sendStatus(406);
			res.send(docs);
		});
		
	} else {
		res.sendStatus(406);
	}
});

module.exports = router;