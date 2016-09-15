var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExerciseSchema = new Schema({
	name:{
		type: String
	},
    title:{
    	type: String
    },
    description:{
    	type: String
    },
    image:{
    	type: String
    },
    related:{
    	type: Object
    },
    videos:{
    	type: Array
    },
    nameSound:{
    	type: String
    },
    procedure:{
    	type: String
    }
});

mongoose.model('Exercise', ExerciseSchema);