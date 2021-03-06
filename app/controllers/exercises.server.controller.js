'use strict';

// Load the module dependencies
var Exercise = require('mongoose').model('Exercise');

exports.create = function(req, res) {
	// Create a new article object
	var exercise = new Exercise(req.body);

	exercise.save(function(err) {
		if (err) {
			// If an error occurs send the error message
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Send a JSON representation of the article 
			res.json(exercise);
		}
	});
};

// Create a new controller method that retrieves a list of articles
exports.list = function(req, res) {
	// Use the model 'find' method to get a list of articles
	Exercise.find().exec(function(err, exercises) {
		if (err) {
			// If an error occurs send the error message
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Send a JSON representation of the article 
			res.json(exercises);
		}
	});
};

// Create a new controller method that returns an existing article
exports.findOneExercise = function(req, res, next, exerciseId) {
	Exercise.findOne({'_id':exerciseId}, function(err, exercise) {
		if (err) return next(err);
		if (!exercise) return next(new Error('Failed to load exercise '+ exerciseId));
		req.exercise = exercise;
		next();
	});
};

exports.read = function(req, res) {
	res.json(req.exercise);
};
/*
// Create a new controller method that updates an existing article
exports.update = function(req, res) {
	// Get the article from the 'request' object
	var article = req.article;

	// Update the article fields
	article.title = req.body.title;
	article.content = req.body.content;

	// Try saving the updated article
	article.save(function(err) {
		if (err) {
			// If an error occurs send the error message
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Send a JSON representation of the article 
			res.json(article);
		}
	});
};

// Create a new controller method that delete an existing article
exports.delete = function(req, res) {
	// Get the article from the 'request' object
	var article = req.article;

	// Use the model 'remove' method to delete the article
	article.remove(function(err) {
		if (err) {
			// If an error occurs send the error message
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Send a JSON representation of the article 
			res.json(article);
		}
	});
};

// Create a new controller middleware that retrieves a single existing article
exports.articleByID = function(req, res, next, id) {
	// Use the model 'findById' method to find a single article 
	Article.findById(id).populate('creator', 'firstName lastName fullName').exec(function(err, article) {
		if (err) return next(err);
		if (!article) return next(new Error('Failed to load article ' + id));

		// If an article is found use the 'request' object to pass it to the next middleware
		req.article = article;

		// Call the next middleware
		next();
	});
};

// Create a new controller middleware that is used to authorize an article operation 
exports.hasAuthorization = function(req, res, next) {
	// If the current user is not the creator of the article send the appropriate error message
	if (req.article.creator.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}

	// Call the next middleware
	next();
};*/