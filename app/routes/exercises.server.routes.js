var exercises = require('../controllers/exercises.server.controller');
	//articles = require('../controllers/articles.server.controller');

module.exports = function(app) {
	app.route('/api/exercises').get(exercises.list).post(exercises.create);
	app.route('/api/exercises/:exerciseId').get(exercises.read);
	/*.put(users.requiresLogin, 
		articles.hasAuthorization, articles.update).delete(users.requiresLogin, 
		articles.hasAuthorization, articles.delete);*/
	app.param('exerciseId', exercises.findOneExercise);
};