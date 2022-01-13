var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var pomuckaSchema = new Schema({
	autor: String,
	nazev: {type: String, required: true},
	rok: Number,
	nakladatel: String,
	mistoVydani: String,
	signatura: String,
	ISXN: Number,
	id: [{type: String, required: true}]
});

module.exports = mongoose.model('pomucky', pomuckaSchema, "pomucky");